// Turns a raw take into the grid clip. Automatic, no speed-ups:
//   1. cut the page chrome off (native window recordings)
//   2. trim to [component mounts → end of take]; loading is never on screen
//   3. frame the component: a static camera crop around everything that
//      appeared during the take, 8:5, max 1.6× (small widgets were already
//      rendered bigger by the take, so nothing gets blurry)
//   4. 60fps, real speed
//   5. seamless loop: the last 0.5s dissolves into the first frame
//   6. encode mp4 (h264) + jpg poster (no webm: vp9 came out larger than
//      h264 for these clips, and every browser plays the mp4)
//
//   node scripts/rec/edit.mjs <name> [--raw dir] [--out public/previews] [--suffix ""]

import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const name = args[0];
const RAW = opt("--raw", join(root, ".rec", "raw"));
const OUT = opt("--out", join(root, "public", "previews"));
const SUFFIX = opt("--suffix", "");
const OUT_W = 1120; // final clip size (8:5); grid cards are ~560 css px → crisp on retina
const OUT_H = 700;
const XF = 0.5; // loop dissolve seconds
mkdirSync(OUT, { recursive: true });

const meta = JSON.parse(readFileSync(join(RAW, `${name}.take.json`), "utf8"));
const raw = join(RAW, `${name}.raw.mp4`);
const probe = JSON.parse(
  execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", raw]).toString(),
);
const srcW = probe.streams[0].width;
const srcH = probe.streams[0].height;
const rawDur = parseFloat(probe.format.duration);

// ── content area inside the captured frame ──────────────────────────────────
let cx = 0, cy = 0, cw = srcW, ch = srcH;
if (meta.mode === "native" && meta.geo) {
  // page content sits at the bottom of the window, below the toolbar
  const s = srcW / meta.geo.outerW;
  cw = Math.round(meta.geo.innerW * s);
  ch = Math.round(meta.geo.innerH * s);
  cx = Math.round((srcW - cw) / 2);
  cy = srcH - ch;
}
const k = cw / meta.W; // source px per css px

// ── camera: static crop around what appeared, 8:5 ──────────────────────────
const AR = 8 / 5;
const box = meta.union && !meta.scroll ? meta.union : meta.restBox;
let fx = 0, fy = 0, fw = meta.W, fh = meta.H;
if (box && !box.full && !meta.scroll) {
  const pad = Math.max(48, Math.max(box.width, box.height) * 0.22);
  let w = box.width + pad * 2;
  let h = box.height + pad * 2;
  if (w / h < AR) w = h * AR;
  else h = w / AR;
  const minW = meta.W / 1.6; // camera zoom ≤ 1.6× (small widgets are already rendered bigger)
  if (w < minW) { w = minW; h = w / AR; }
  if (w > meta.W) { w = meta.W; h = meta.H; }
  const mx = box.x + box.width / 2;
  const my = box.y + box.height / 2;
  fx = Math.min(Math.max(0, mx - w / 2), meta.W - w);
  fy = Math.min(Math.max(0, my - h / 2), meta.H - h);
  fw = w;
  fh = h;
}
let crop = [fw * k, fh * k, cx + fx * k, cy + fy * k];
// Native window recordings keep ~3 css px of browser chrome above the page
// (the toolbar's bottom edge + Chrome's page-load bar): the "line on top" of
// the first batch of clips. Never let the crop reach into the top 5 css px;
// shrink it about its center (keeping 8:5) when it would.
if (meta.mode === "native") {
  const safeTop = cy + 5 * k;
  if (crop[3] < safeTop) {
    const cut = safeTop - crop[3];
    const nh = crop[1] - cut;
    const nw = nh * AR;
    crop = [nw, nh, crop[2] + (crop[0] - nw) / 2, safeTop];
  }
}
crop = crop.map((v) => Math.round(v / 2) * 2);

// ── timing ──────────────────────────────────────────────────────────────────
const off = meta.startOffset || 0;
const start = Math.max(0, meta.mountT - off + 0.05);
// Native recordings are variable-frame-rate: a static stretch writes no frames,
// so the file can end before the take did. Hold the last frame to the real end.
const end = meta.endT - off;
const tailPad = Math.max(0, end - rawDur) + 0.2;
const len = end - start;
if (len < 1.5) throw new Error(`take too short (${len.toFixed(2)}s)`);

// Seamless loop: out = C[XF, L] with its last XF seconds dissolved into C[0, XF].
// It starts on frame C(XF) and ends on frame C(XF), so the loop has no seam.
// Static things (patterns, still cards) marked "kenburns" by the take get a slow
// 6% camera push-in so the card isn't a frozen picture. Rendered at 2× and
// scaled down so the per-frame zoom doesn't shimmer.
const kenburns = meta.marks?.some((m) => m.label === "kenburns");
const base = kenburns
  ? `crop=${crop.join(":")},scale=${OUT_W * 2}:${OUT_H * 2}:flags=lanczos,fps=60,` +
    `scale=w='${OUT_W * 2}*(1+0.06*t/${len.toFixed(3)})':h=-2:eval=frame:flags=bicubic,` +
    `crop=${OUT_W * 2}:${OUT_H * 2},scale=${OUT_W}:${OUT_H}:flags=lanczos,setsar=1`
  : `crop=${crop.join(":")},scale=${OUT_W}:${OUT_H}:flags=lanczos,fps=60,setsar=1`;
const fc = [
  `[0:v]fps=60,tpad=stop_mode=clone:stop_duration=${tailPad.toFixed(3)},trim=start=${start.toFixed(3)}:end=${end.toFixed(3)},setpts=PTS-STARTPTS,${base},split[a][b]`,
  `[a]trim=start=${XF},setpts=PTS-STARTPTS[main]`,
  `[b]trim=end=${XF + 0.05},setpts=PTS-STARTPTS[head]`,
  `[main][head]xfade=transition=fade:duration=${XF}:offset=${(len - 2 * XF).toFixed(3)},format=yuv420p[v]`,
].join(";");

const mp4 = join(OUT, `${name}${SUFFIX}.mp4`);
const jpg = join(OUT, `${name}${SUFFIX}.jpg`);
// 2 threads per encode: several edits run in parallel during a batch
const ff = (a) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-threads", "2", ...a], { stdio: ["ignore", "ignore", "inherit"] });

// --fast (test takes): quick h264. Final clips: slow h264.
const FAST = args.includes("--fast");
ff(["-i", raw, "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", FAST ? "veryfast" : "slow", "-crf", FAST ? "26" : "24",
  "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
// (webm intentionally not produced; see header)

// poster: the "hero" mark if the take set one, else 55% through
const hero = meta.marks?.find((m) => m.label === "hero");
const outLen = len - XF;
const posterT = hero ? Math.min(outLen - 0.1, Math.max(0, hero.t - (meta.mountT - off) - XF)) : outLen * 0.55;
ff(["-ss", posterT.toFixed(2), "-i", mp4, "-frames:v", "1", "-q:v", "3", jpg]);

const kb = (p) => Math.round(statSync(p).size / 1024);
console.log(`✓ edit ${name}: ${outLen.toFixed(1)}s · zoom ${(meta.W / fw).toFixed(2)}× · mp4 ${kb(mp4)}KB `);
