// Encodes every grid clip master (public/previews/<name>.mp4 + .jpg) into the
// renditions the gallery actually serves:
//
//   public/previews/hi/<name>.mp4      960w · 30fps · CRF 28   (retina desktop)
//   public/previews/md/<name>.mp4      640w · 30fps · CRF 30   (1x desktop, most phones)
//   public/previews/lo/<name>.mp4      400w · 24fps · CRF 33   (slow links)
//   public/previews/poster/<name>.webp 640w webp q72           (shown before/without video)
//   public/previews/lq/<name>.webp      32w webp q40, ~0.3 KB  (blurred placeholder)
//
// The client picks a clip tier per card from measured bandwidth, device pixel
// ratio and card width (src/lib/preview-quality.ts). Masters stay the source of
// truth (capture + reframe.py write them); outputs are skipped when newer than
// their master, so re-running is incremental. Heavy: run on the recording Mac.
//
//   node scripts/encode-previews.mjs [names...] [--jobs 8] [--force] [--all]
//   then: npm run previews   (records versions + tier availability)

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { cpus, tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "previews");

const args = process.argv.slice(2);
const flag = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : d;
};
const force = args.includes("--force");
const jobs = Number(flag("--jobs", Math.max(2, cpus().length - 2)));
const only = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--jobs"));

export const VIDEO_TIERS = {
  hi: { w: 960, fps: 30, crf: 28 },
  md: { w: 640, fps: 30, crf: 30 },
  lo: { w: 400, fps: 24, crf: 33 },
};

const x264 = (t) => [
  "-an",
  "-vf", `fps=${t.fps},scale=${t.w}:-2:flags=lanczos`,
  "-c:v", "libx264", "-preset", "slow", "-crf", String(t.crf),
  "-profile:v", "high", "-pix_fmt", "yuv420p",
  // a keyframe every 2s keeps seeking/looping cheap without bloating the clip
  "-g", String(t.fps * 2),
  "-movflags", "+faststart",
];

for (const sub of [...Object.keys(VIDEO_TIERS), "poster", "lq"]) {
  mkdirSync(join(dir, sub), { recursive: true });
}

// Only components the gallery shows (meta.gen.ts already drops archived and
// uncatalogued ones); masters of dropped components stay untouched on disk.
// --all encodes every master regardless; explicit names always encode.
const gallery = new Set(
  [...readFileSync(join(root, "src", "__registry__", "meta.gen.ts"), "utf8")
    .matchAll(/"name":\s*"([^"]+)"/g)].map((m) => m[1]),
);
const names = readdirSync(dir)
  .filter((f) => f.endsWith(".mp4"))
  .map((f) => f.slice(0, -4))
  // Names given explicitly (capture/reframe pass them) are always encoded,
  // even before `npm run registry` has put the component in meta.gen.ts.
  .filter((n) => (only.length ? only.includes(n) : args.includes("--all") || gallery.has(n)))
  .sort();

const stale = (out, src) =>
  force || !existsSync(out) || statSync(out).mtimeMs < statSync(src).mtimeMs;

function run(argv) {
  // Plain argv = ffmpeg; {cmd, argv} = another tool (cwebp, whose WebP encoder
  // is everywhere, unlike ffmpeg's optional libwebp).
  const [cmd, list] = Array.isArray(argv)
    ? ["ffmpeg", ["-y", "-loglevel", "error", ...argv]]
    : [argv.cmd, argv.argv];
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, list, {
      stdio: ["ignore", "ignore", "pipe"],
    });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("close", (c) => (c === 0 ? resolve() : reject(new Error(err.trim()))));
  });
}

/** All ffmpeg invocations for one component (only the stale outputs). */
function tasksFor(name) {
  const mp4 = join(dir, `${name}.mp4`);
  const jpg = join(dir, `${name}.jpg`);
  const t = [];
  for (const [tier, spec] of Object.entries(VIDEO_TIERS)) {
    const out = join(dir, tier, `${name}.mp4`);
    if (stale(out, mp4)) t.push(["-i", mp4, ...x264(spec), out]);
  }
  // Posters come from the master jpg (it is the curated mid-clip frame); a
  // master without one gets a frame grabbed from 1s in first.
  const hasJpg = existsSync(jpg);
  const frame = hasJpg ? jpg : join(tmpdir(), `stash-frame-${name}.png`);
  const ref = hasJpg ? jpg : mp4;
  const poster = join(dir, "poster", `${name}.webp`);
  const lq = join(dir, "lq", `${name}.webp`);
  const images = [];
  if (stale(poster, ref)) {
    images.push({ cmd: "cwebp", argv: ["-quiet", "-q", "72", "-m", "6", "-resize", "640", "0", frame, "-o", poster] });
  }
  if (stale(lq, ref)) {
    images.push({ cmd: "cwebp", argv: ["-quiet", "-q", "40", "-resize", "32", "0", frame, "-o", lq] });
  }
  if (images.length) {
    // one task so the grabbed frame exists before cwebp reads it
    t.push({
      steps: [
        ...(hasJpg ? [] : [["-ss", "1", "-i", mp4, "-frames:v", "1", frame]]),
        ...images,
      ],
    });
  }
  return t;
}

const queue = names.flatMap((n) => tasksFor(n).map((a) => ({ n, a })));
console.log(`${names.length} clips · ${queue.length} encodes · ${jobs} jobs`);

let done = 0;
const failed = new Set();
const started = Date.now();
async function worker() {
  for (;;) {
    const job = queue.shift();
    if (!job) return;
    try {
      for (const step of job.a.steps ?? [job.a]) await run(step);
    } catch (e) {
      failed.add(job.n);
      console.error(`✗ ${job.n}: ${e.message.split("\n")[0]}`);
    }
    if (++done % 100 === 0) {
      const s = ((Date.now() - started) / 1000).toFixed(0);
      console.log(`  ${done} done (${s}s)`);
    }
  }
}
await Promise.all(Array.from({ length: jobs }, worker));
console.log(
  `✓ ${done} encodes in ${((Date.now() - started) / 1000).toFixed(0)}s` +
    (failed.size ? ` · ${failed.size} failed: ${[...failed].join(", ")}` : ""),
);
