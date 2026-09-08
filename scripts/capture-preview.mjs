// Records a short, sped-up, looped grid clip for one component.
//
//   node scripts/capture-preview.mjs <name> [--port 3000] [--keep]
//
// Pipeline: Playwright drives /preview/<name>?view=detail (the real render),
// runs the component's interaction choreography (scripts/captures/<name>.mjs or
// _default.mjs), records webm → ffmpeg speeds it up and encodes a compact
// webm + mp4 + jpg poster into public/previews/.
//
// Requires the dev server to be running (npm run dev) and ffmpeg on PATH.

import { chromium } from "playwright";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  mkdirSync,
  rmSync,
  mkdtempSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith("--"));
const port = (args[args.indexOf("--port") + 1] && args.includes("--port"))
  ? args[args.indexOf("--port") + 1]
  : "3000";
const keep = args.includes("--keep");

if (!name) {
  console.error("usage: node scripts/capture-preview.mjs <name> [--port 3000]");
  process.exit(1);
}

// ── resolve per-component config ──────────────────────────────────────────────
import { readdirSync } from "node:fs";
function locateSidecar(dir) {
  const want = `${name}.preview.json`;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      const hit = locateSidecar(full);
      if (hit) return hit;
    } else if (e.name === want) return full;
  }
  return null;
}

const DEFAULTS = {
  align: "center",
  scroll: false,
  grid: { width: 1200, height: 750, speed: 1.8, fps: 30 },
};
let cfg = { ...DEFAULTS };
const sidecarPath = locateSidecar(join(root, "registry"));
if (sidecarPath) {
  try {
    const raw = JSON.parse(readFileSync(sidecarPath, "utf8"));
    cfg = { ...DEFAULTS, ...raw, grid: { ...DEFAULTS.grid, ...(raw.grid || {}) } };
  } catch (err) {
    console.warn(`! invalid sidecar ${sidecarPath}: ${err.message}`);
  }
}

const W = cfg.grid.width;
const H = cfg.grid.height;
const SPEED = cfg.grid.speed;
const FPS = cfg.grid.fps;

// ── load interaction choreography ─────────────────────────────────────────────
async function loadChoreography() {
  const bespoke = join(root, "scripts", "captures", `${name}.mjs`);
  const mod = existsSync(bespoke)
    ? bespoke
    : join(root, "scripts", "captures", "_default.mjs");
  return (await import(pathToFileURL(mod).href)).default;
}

// ── capture ───────────────────────────────────────────────────────────────────
const tmp = mkdtempSync(join(tmpdir(), "stashui-cap-"));
const outDir = join(root, "public", "previews");
mkdirSync(outDir, { recursive: true });

const url =
  `http://localhost:${port}/preview/${encodeURIComponent(name)}` +
  `?view=detail&theme=dark&align=${cfg.align}&scroll=${cfg.scroll}`;

console.log(`● capturing ${name}  (${W}×${H} @ ${SPEED}×)  ${url}`);

const browser = await chromium.launch({
  // Let muted AND unmuted <video autoPlay> start without a user gesture, so
  // video-backed components (players, masked video) actually paint frames.
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 2,
  colorScheme: "dark",
  recordVideo: { dir: tmp, size: { width: W, height: H } },
});
const page = await context.newPage();

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
} catch {
  // networkidle can hang on components with persistent animation loops
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
}
// hide Next's dev overlay / indicators so they never land in the clip
await page.addStyleTag({
  content: `nextjs-portal, #__next-build-watcher, [data-nextjs-toast],
    [data-nextjs-dev-tools-button], #__next-route-announcer__ { display: none !important; }`,
});
await page.waitForTimeout(700); // let fonts/layout settle

const wait = (ms) => page.waitForTimeout(ms);
const choreograph = await loadChoreography();
// Back-compat: the canonical signature is `(page, { W, H, cfg, wait })`, but
// some choreographies destructure the first arg as `({ page, W, H, cfg, wait,
// sleep, waitForSelector })`. Mirror the whole context onto the page object so
// either style works.
page.page = page;
page.sleep = wait;
page.wait = wait;
page.W = W;
page.H = H;
page.cfg = cfg;
if (typeof page.waitForSelector === "function") {
  page.waitForSelector = page.waitForSelector.bind(page);
}
try {
  await choreograph(page, { W, H, cfg, wait });
} catch (err) {
  console.warn(`! choreography error (continuing): ${err.message}`);
}

const video = page.video();
await context.close(); // finalizes the .webm
const rawPath = await video.path();
await browser.close();

// ── encode: speed up + compress (webm vp9 + mp4 h264 + jpg poster) ────────────
function ffmpeg(label, fileArgs) {
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...fileArgs], {
    stdio: "inherit",
  });
  if (r.status !== 0) throw new Error(`ffmpeg ${label} failed (${r.status})`);
}

const webm = join(outDir, `${name}.webm`);
const mp4 = join(outDir, `${name}.mp4`);
const jpg = join(outDir, `${name}.jpg`);
const vf = `setpts=PTS/${SPEED},fps=${FPS},scale=${W}:-2:flags=lanczos`;

ffmpeg("webm", [
  "-i", rawPath, "-an", "-vf", vf,
  "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1",
  "-pix_fmt", "yuv420p", webm,
]);
ffmpeg("mp4", [
  "-i", rawPath, "-an", "-vf", vf,
  "-c:v", "libx264", "-preset", "medium", "-crf", "27",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4,
]);
// Poster: seek to mid-clip (where reveal/typing animations have played out and
// content is fully on screen), then let `thumbnail` pick the best nearby frame
// — so the poster is never the faint pre-reveal frame 0.
function probeDuration(file) {
  const r = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file],
    { encoding: "utf8" },
  );
  return parseFloat(r.stdout) || 0;
}
const posterSeek = (probeDuration(mp4) * 0.55).toFixed(2);
ffmpeg("poster", [
  "-ss", posterSeek, "-i", mp4, "-vf", "thumbnail=n=20",
  "-frames:v", "1", "-q:v", "4", jpg,
]);

if (!keep) rmSync(tmp, { recursive: true, force: true });

const { statSync } = await import("node:fs");
const kb = (p) => Math.round(statSync(p).size / 1024);
console.log(
  `✓ ${name}: webm ${kb(webm)}KB · mp4 ${kb(mp4)}KB · poster ${kb(jpg)}KB`,
);
