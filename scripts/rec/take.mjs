// Records one raw take of a component, the SIH way: set up off camera, press
// record, the component mounts on camera, a drawn cursor performs the take at
// real speed, end at rest, stop. Editing happens later (edit.mjs).
//
//   node scripts/rec/take.mjs <name> [--base URL] [--mode native|screencast] [--out dir]
//
// native     = real Chrome window + ScreenCaptureKit at 60fps (spare Mac).
// screencast = headless CDP screencast (quick local tests; lower fidelity).
//
// Writes <out>/<name>.raw.mp4 and <out>/<name>.take.json (marks, crop box).

import { chromium } from "playwright";
import { spawn, execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createFilm } from "./film.mjs";
import { defaultRoutine } from "./defaults.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const name = args[0];
const BASE = opt("--base", "http://localhost:3000");
const MODE = opt("--mode", process.platform === "darwin" && existsSync(join(here, "bin", "recorder")) ? "native" : "screencast");
const OUT = opt("--out", join(root, ".rec", "raw"));
if (!name || name.startsWith("--")) {
  console.error("usage: node scripts/rec/take.mjs <name> [--base URL] [--mode native|screencast]");
  process.exit(2);
}
mkdirSync(OUT, { recursive: true });

// which recording slot this take holds: also picks a distinct window position
let recSlot = 0;
// ── machine-wide limit: at most REC_SLOTS takes record at once, whoever starts
// them (several agents/batches can't overload the machine). mkdir is atomic.
{
  const SLOTS = +(process.env.REC_SLOTS ?? 2);
  const lockDir = join(root, ".rec", "locks");
  mkdirSync(lockDir, { recursive: true });
  let held = null;
  const alive = (pid) => {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  };
  for (let waited = 0; !held; waited++) {
    for (let s = 0; s < SLOTS && !held; s++) {
      const d = join(lockDir, `slot${s}`);
      try {
        mkdirSync(d);
        writeFileSync(join(d, "pid"), String(process.pid));
        held = d;
        recSlot = s;
      } catch {
        // stale lock from a killed process → take it over
        const pid = +(existsSync(join(d, "pid")) ? readFileSync(join(d, "pid"), "utf8") : 0);
        if (pid && !alive(pid)) rmSync(d, { recursive: true, force: true });
      }
    }
    if (!held) {
      if (waited % 30 === 0) console.log(`… waiting for a recording slot (${SLOTS} in use)`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  const release = () => rmSync(held, { recursive: true, force: true });
  process.on("exit", release);
  for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => process.exit(1));
}

// ── per-component config ───────────────────────────────────────────────────
function findSidecar(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      const hit = findSidecar(full);
      if (hit) return hit;
    } else if (e.name === `${name}.preview.json`) return full;
  }
  return null;
}
const sidecar = findSidecar(join(root, "registry"));
const cfg = sidecar ? JSON.parse(readFileSync(sidecar, "utf8")) : {};
const cats = JSON.parse(readFileSync(join(root, "registry", "categories.json"), "utf8"));
const catList = [].concat(cats[name] ?? "misc");
const W = 1200;
const H = 750;

const bespoke = join(root, "scripts", "takes", `${name}.mjs`);
const routine = existsSync(bespoke)
  ? (await import(pathToFileURL(bespoke).href)).default
  : defaultRoutine(catList[0], cfg);

const q = `view=detail&theme=dark&align=${cfg.align ?? "center"}&scroll=${cfg.scroll ?? false}`;
const url = `${BASE}/preview/${encodeURIComponent(name)}?${q}`;

// ── browser ────────────────────────────────────────────────────────────────
const native = MODE === "native" || MODE === "native-headless";
// native-headless: headless Chrome still owns a real (off-screen) window that
// ScreenCaptureKit can record at 60fps: no visible windows, real GPU frames.
const headless = MODE !== "native";
const browser = await chromium.launch({
  channel: "chrome",
  headless,
  args: [
    "--autoplay-policy=no-user-gesture-required",
    // camera/mic components (webcam grids, reflective cards) get a synthetic
    // stream instead of a permission prompt landing in the clip
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--ignore-gpu-blocklist",
    "--hide-scrollbars",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-background-timer-throttling",
    // headless: without an explicit window size the screencast frames come out
    // 1200×663 (squashed); native: stagger windows when running several jobs
    ...(headless ? [`--window-size=${W},${H}`] : [`--window-position=${40 + (recSlot % 4) * 60},${60 + (recSlot % 3) * 40}`]),
  ],
});
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 2,
  colorScheme: "dark",
  reducedMotion: "no-preference",
});
await context.addInitScript({ path: join(here, "cursor.js") });
const page = await context.newPage();
page.setDefaultTimeout(15000);
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e.message).slice(0, 200)));

async function settle() {
  await page.waitForLoadState("load").catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
}

// What part of the frame does the component occupy? Union of the rects of
// visible "leaf" elements (text, media, controls), clipped to the viewport.
const MEASURE = () => {
  const vw = innerWidth;
  const vh = innerHeight;
  let x0 = vw, y0 = vh, x1 = 0, y1 = 0, n = 0;
  const rootEl = document.querySelector("[data-rec-root]");
  if (!rootEl) return null;
  const all = [rootEl, ...rootEl.querySelectorAll("*"), ...document.querySelectorAll("body > *:not([data-rec-root]):not([data-rec-cursor]) *")];
  for (const el of all) {
    if (el.hasAttribute?.("data-rec-cursor")) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.width >= vw * 0.98 && r.height >= vh * 0.98 && el.children.length) continue; // wrappers
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || +cs.opacity === 0 || cs.display === "contents") continue;
    const leaf =
      /^(IMG|SVG|CANVAS|VIDEO|INPUT|TEXTAREA|BUTTON|SELECT|svg|PICTURE|IFRAME)$/.test(el.tagName) ||
      [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim()) ||
      (cs.backgroundImage !== "none") ||
      (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent" && !(r.width >= vw * 0.98 && r.height >= vh * 0.98)) ||
      parseFloat(cs.borderTopWidth) > 0;
    if (!leaf) continue;
    x0 = Math.min(x0, Math.max(0, r.left));
    y0 = Math.min(y0, Math.max(0, r.top));
    x1 = Math.max(x1, Math.min(vw, r.right));
    y1 = Math.max(y1, Math.min(vh, r.bottom));
    n++;
  }
  if (!n || x1 <= x0 || y1 <= y0) return { x: 0, y: 0, width: vw, height: vh, full: true };
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
};

// ── 1. warm-up visit: caches every chunk/image, measures the resting frame ──
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await settle();
await page.waitForTimeout(2200);
const restBox = await page.evaluate(MEASURE);

// ── 2. take visit: everything loaded, component not mounted yet ─────────────
await page.goto(`${url}&mount=manual`, { waitUntil: "domcontentloaded", timeout: 30000 });
await settle();
await page.waitForFunction(() => window.__stashuiReady === true, null, { timeout: 20000 });
// Small widgets render bigger (crisp, real layout) instead of being blown up
// by the camera: zoom the whole page so the component fills ~55% of the frame.
// Things that open popups (dialogs, menus, pickers) get a low cap so the popup
// still fits once it opens. Full-width widgets reflow to the zoomed viewport,
// so only their height limits the zoom.
const POPUP = new Set(["modals", "selects", "tooltips", "menus", "navigation", "calendar", "notifications", "search"]);
// Components that place things from raw mouse coordinates (custom cursors,
// magnets, spotlights) break under page zoom: the effect lands off the pointer.
// Those are never zoomed; the camera crop still frames them.
const regItem = JSON.parse(readFileSync(join(root, "registry.json"), "utf8")).items.find((i) => i.name === name);
const srcFile = regItem?.files?.[0]?.path ? join(root, regItem.files[0].path) : null;
const usesPointerCoords = srcFile && existsSync(srcFile) && /\b(clientX|clientY|pageX|pageY|screenX|offsetX|movementX|getBoundingClientRect)\b/.test(readFileSync(srcFile, "utf8"));
// Popover/menu/select/tooltip libraries (Radix, floating-ui, vaul…) position
// their portals from unzoomed coordinates: under page zoom the menu lands far
// from its trigger and gets cut off. Never page-zoom those either. The demo
// file is checked too (it is often what wraps the component in a Popover).
const demoFile = srcFile ? srcFile.replace(/\.tsx$/, ".demo.tsx") : null;
const srcText = [srcFile, demoFile].filter((f) => f && existsSync(f)).map((f) => readFileSync(f, "utf8")).join("\n");
const usesPopper = /@radix-ui|from "radix-ui"|@floating-ui|vaul|Popover|DropdownMenu|ContextMenu|Menubar|HoverCard|Tooltip|Select(Trigger|Content)|Combobox|NavigationMenu|Drawer|Dialog/.test(srcText);
const maxZoom = cfg.recZoom ?? (usesPointerCoords || usesPopper ? 1 : catList.some((c) => POPUP.has(c)) ? 1.5 : 2.6);
let zoom = 1;
if (restBox && !restBox.full && !cfg.scroll) {
  const fluid = restBox.width >= W * 0.85;
  zoom = Math.min(fluid ? Infinity : (0.55 * W) / restBox.width, (0.55 * H) / restBox.height, maxZoom);
  zoom = Math.max(1, Math.round(zoom * 20) / 20);
}
if (zoom > 1) {
  await page.evaluate((z) => {
    window.__recZoom = z;
    document.documentElement.style.zoom = String(z);
    // 100vh/100vw ignore page zoom, so pin the preview wrapper to the zoomed
    // viewport or the component ends up centred far below the frame
    const r = document.querySelector("[data-rec-root]");
    if (r) {
      r.style.minHeight = "0";
      r.style.height = `${innerHeight / z}px`;
      r.style.width = `${innerWidth / z}px`;
      r.style.overflow = "visible";
    }
    document.body.style.overflow = "hidden";
  }, zoom);
}
// resting box in viewport px after zoom (page stays centred)
const zBox = restBox && zoom > 1
  ? {
      x: restBox.x + restBox.width / 2 - (restBox.width * zoom) / 2,
      y: restBox.y + restBox.height / 2 - (restBox.height * zoom) / 2,
      width: restBox.width * zoom,
      height: restBox.height * zoom,
    }
  : restBox;
const title = `REC-${name}-${Date.now()}`;
await page.evaluate((t) => (document.title = t), title);

const film = createFilm(page, { W, H, name, bbox: zBox });
await film._placeAtRest();

// track the union of everything that appears during the take (menus, popovers)
const startTracking = () =>
  page.evaluate((src) => {
    const measure = new Function(`return (${src})()`);
    window.__recUnion = null;
    window.__recTrack = setInterval(() => {
      const b = measure();
      if (!b || b.full) return;
      const u = window.__recUnion;
      window.__recUnion = u
        ? {
            x: Math.min(u.x, b.x),
            y: Math.min(u.y, b.y),
            r: Math.max(u.r, b.x + b.width),
            b: Math.max(u.b, b.y + b.height),
          }
        : { x: b.x, y: b.y, r: b.x + b.width, b: b.y + b.height };
    }, 250);
  }, MEASURE.toString());

// ── recorder backends ───────────────────────────────────────────────────────
const raw = join(OUT, `${name}.raw.mp4`);
rmSync(raw, { force: true });
let stopRecording;
let recT0 = 0;

if (native) {
  const bin = join(here, "bin", "recorder");
  // the OS window title follows document.title a moment later: retry briefly
  let list = "";
  let line;
  for (let i = 0; i < 25 && !line; i++) {
    if (i) await new Promise((r) => setTimeout(r, 200));
    try {
      list = execFileSync(bin, ["--list", title], { timeout: 8000 }).toString();
    } catch {
      list = "";
    }
    line = list.split("\n").find((l) => l.includes(title));
  }
  if (!line) throw new Error(`recorder: no window titled ${title}\n${list}`);
  const id = line.split(" ")[1];
  // window geometry → where the page content sits inside the captured window
  const geo = await page.evaluate(() => ({ outerW: outerWidth, outerH: outerHeight, innerW: innerWidth, innerH: innerHeight }));
  // ScreenCaptureKit sometimes refuses a start when two recordings begin at the
  // same moment (ReplayKit -5814): retry the start a couple of times.
  // Only one capture session may be *starting* at a time across all runners:
  // simultaneous starts are what trigger -5814. Held from spawn until the
  // recorder reports RECORDING (+ a short settle), never during the take.
  const startLock = join(root, ".rec", "locks", "start");
  const takeStartLock = async () => {
    for (let i = 0; i < 600; i++) {
      try {
        mkdirSync(startLock);
        writeFileSync(join(startLock, "pid"), String(process.pid));
        return;
      } catch {
        let pid = 0;
        try {
          pid = +readFileSync(join(startLock, "pid"), "utf8");
        } catch {}
        let alive = false;
        try {
          process.kill(pid, 0);
          alive = pid > 0;
        } catch {}
        if (!alive && i > 2) rmSync(startLock, { recursive: true, force: true });
        await new Promise((r) => setTimeout(r, 100));
      }
    }
  };
  const dropStartLock = () => rmSync(startLock, { recursive: true, force: true });
  process.on("exit", () => {
    try {
      if (readFileSync(join(startLock, "pid"), "utf8") === String(process.pid)) dropStartLock();
    } catch {}
  });
  let proc, recLog, exitCode, exited;
  for (let attempt = 0; ; attempt++) {
    await takeStartLock();
    rmSync(raw, { force: true });
    proc = spawn(bin, [id, raw], { stdio: ["pipe", "pipe", "inherit"] });
    {
      // never leave a recorder behind: each one holds a system capture session,
      // and leftovers starve every later recording
      const r = proc;
      process.on("exit", () => {
        try {
          r.kill("SIGTERM"); // the recorder stops its capture session cleanly on TERM
        } catch {}
      });
    }
    recLog = "";
    exitCode = null;
    const p = proc;
    exited = new Promise((r) => p.on("exit", (c) => ((exitCode = c), r())));
    try {
      await new Promise((resolve, reject) => {
        p.stdout.on("data", (d) => {
          const s = d.toString();
          recLog += s;
          if (s.includes("RECORDING")) resolve();
          if (s.includes("FAILED")) reject(new Error(s));
        });
        exited.then(() => reject(new Error(`recorder exited ${exitCode}: ${recLog}`)));
        // a covered/minimised window never delivers a first frame: don't wait forever
        setTimeout(() => reject(new Error(`recorder never started (window not drawing?): ${recLog}`)), 15000);
      });
      await new Promise((r) => setTimeout(r, 600));
      dropStartLock();
      break;
    } catch (e) {
      p.kill();
      await new Promise((r) => setTimeout(r, 400));
      dropStartLock();
      if (attempt >= 2) throw e;
      await new Promise((r) => setTimeout(r, 1500 + attempt * 1000));
    }
  }
  recT0 = Date.now();
  cfg.__geo = geo;
  stopRecording = async () => {
    proc.stdin.write("\n");
    await exited;
    if (exitCode !== 0 || !existsSync(raw)) throw new Error(`recorder failed (exit ${exitCode}): ${recLog.trim()}`);
  };
} else {
  const cdp = await context.newCDPSession(page);
  const frameDir = join(OUT, `${name}.frames`);
  rmSync(frameDir, { recursive: true, force: true });
  mkdirSync(frameDir);
  const frames = [];
  cdp.on("Page.screencastFrame", async (f) => {
    const file = join(frameDir, `${String(frames.length).padStart(5, "0")}.jpg`);
    writeFileSync(file, Buffer.from(f.data, "base64"));
    frames.push({ file, t: f.metadata.timestamp });
    await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1, maxWidth: W * 2, maxHeight: H * 2 });
  recT0 = Date.now();
  stopRecording = async () => {
    const stopAt = Date.now() / 1000;
    await cdp.send("Page.stopScreencast").catch(() => {});
    await new Promise((r) => setTimeout(r, 300));
    // variable-timed frames → concat list with real durations → 60fps CFR
    const lst = frames
      // a static page sends no new frames: the last frame lasts until stop
      .map((f, i) => `file '${f.file}'\nduration ${Math.max(0.001, ((frames[i + 1]?.t ?? stopAt) - f.t)).toFixed(4)}`)
      .join("\n");
    writeFileSync(join(frameDir, "list.txt"), lst + `\nfile '${frames.at(-1).file}'\n`);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", join(frameDir, "list.txt"),
      // headless frames are 1× CSS px: keep that size (edit.mjs reads the real
      // size), encode near-lossless but cheaply, and on 2 threads only so
      // several takes can run side by side without starving the browsers
      "-vf", `scale=${W}:${H}:flags=lanczos,fps=60,format=yuv420p`, "-c:v", "libx264", "-crf", "12", "-preset", "ultrafast", "-threads", "2", raw]);
    cfg.__startOffset = frames.length ? Math.max(0, frames[0].t * 1000 - recT0) / 1000 : 0;
    rmSync(frameDir, { recursive: true, force: true });
  };
}

// ── 3. the take ─────────────────────────────────────────────────────────────
film._resetClock();
const rel = () => (Date.now() - recT0) / 1000;
await page.waitForTimeout(350); // empty background: trimmed away in the edit
const mountT = rel();
await page.evaluate(() => window.__stashuiMount());
await startTracking();
await page.waitForTimeout(1100); // establishing hold
let choreoError = null;
try {
  await routine(film, { W, H, cfg, categories: catList });
} catch (e) {
  choreoError = String(e.message).slice(0, 200);
  console.warn(`! take script: ${choreoError}`);
}
await film.park().catch(() => {});
await page.waitForTimeout(900);
const endT = rel();
const union = await page.evaluate(() => {
  clearInterval(window.__recTrack);
  return window.__recUnion;
});
await stopRecording();
await browser.close();

const meta = {
  name,
  mode: MODE,
  W,
  H,
  dpr: 2,
  categories: catList,
  routine: existsSync(bespoke) ? "bespoke" : "default",
  mountT,
  endT,
  zoom,
  restBox: zBox,
  union: union
    ? { x: union.x, y: union.y, width: union.r - union.x, height: union.b - union.y } // viewport px, zoom already applied
    : null,
  marks: film._marks.map((m) => ({ ...m, t: m.t + 0 })),
  geo: cfg.__geo ?? null,
  startOffset: cfg.__startOffset ?? 0,
  scroll: !!cfg.scroll,
  choreoError,
  pageErrors,
};
writeFileSync(join(OUT, `${name}.take.json`), JSON.stringify(meta, null, 1));
console.log(`✓ take ${name}  ${MODE}  ${(endT - mountT).toFixed(1)}s  ${choreoError ? "(script error)" : ""}`);
