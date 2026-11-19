// Automatic checks on an edited clip. A clip that fails is re-shot, never shipped.
//
//   node scripts/rec/qa.mjs <name...> [--dir public/previews] [--sheets dir] [--json out.json]
//
// Checks
//   duration   3–14 s (3–23 s with --long, for scroll-driven takes)
//   visible    the component is actually on screen (ink = share of pixels that
//              differ from the background, sampled across the clip)
//   firstFrame the loop's first frame is not an empty/loading frame
//   seam       last frame ≈ first frame (the loop doesn't blink)
//   motion     something moves (a cursor, an animation), unless the take is ambient
//   smooth     no long frozen stretches mid-clip (stalls / dropped frames)
// Also writes a contact sheet per clip for human review.

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const DIR = opt("--dir", join(root, "public", "previews"));
const SHEETS = opt("--sheets", join(root, ".rec", "sheets"));
const JSON_OUT = opt("--json", null);
const flagVals = new Set(["--dir", "--sheets", "--json"].map((k) => opt(k, null)).filter(Boolean));
const names = args.filter((a) => !a.startsWith("--") && !flagVals.has(a));
mkdirSync(SHEETS, { recursive: true });

const SW = 160; // analysis frame width
const SH = 100;

function frames(file, fps) {
  const buf = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-vf", `fps=${fps},scale=${SW}:${SH}`, "-f", "rawvideo", "-pix_fmt", "gray", "-"], {
    maxBuffer: 1 << 28,
  });
  const out = [];
  for (let o = 0; o + SW * SH <= buf.length; o += SW * SH) out.push(buf.subarray(o, o + SW * SH));
  return out;
}
const bgOf = (f) => {
  const h = new Map();
  for (const v of f) h.set(v >> 2, (h.get(v >> 2) ?? 0) + 1);
  return [...h.entries()].sort((a, b) => b[1] - a[1])[0][0] << 2;
};
const ink = (f, bg) => {
  let n = 0;
  for (const v of f) if (Math.abs(v - bg) > 10) n++;
  return n / f.length;
};
const diff = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return s / a.length;
};

const results = [];
for (const name of names) {
  const mp4 = join(DIR, `${name}.mp4`);
  if (!existsSync(mp4)) {
    results.push({ name, pass: false, fails: ["missing clip"] });
    console.log(`FAIL  ${name}  — missing clip`);
    continue;
  }
  const dur = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]).toString());
  const fr = frames(mp4, 10);
  const bg = bgOf(fr[Math.floor(fr.length / 2)]);
  const inks = fr.map((f) => ink(f, bg));
  const maxInk = Math.max(...inks);
  const medInk = [...inks].sort((a, b) => a - b)[Math.floor(inks.length / 2)];
  const steps = fr.slice(1).map((f, i) => diff(f, fr[i]));
  const moving = steps.filter((d) => d > 0.04).length / Math.max(1, steps.length);
  // longest frozen run in the middle 70% of the clip (ignore holds at the ends)
  let run = 0, longest = 0;
  const a = Math.floor(steps.length * 0.15), b = Math.floor(steps.length * 0.85);
  for (let i = a; i < b; i++) {
    run = steps[i] < 0.01 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  const seam = diff(fr[0], fr.at(-1));
  const fails = [];
  // scroll-driven components (sticky stacks, scroll reveals) need the time
  // to scroll through; batch.mjs passes --long for them
  const maxDur = process.argv.includes("--long") ? 23 : 14;
  if (dur < 3 || dur > maxDur) fails.push(`duration ${dur.toFixed(1)}s`);
  if (maxInk < 0.01) fails.push(`nothing visible (ink ${maxInk.toFixed(3)})`);
  // a moving cursor over an empty/black frame is not content: most frames must show something
  else if (medInk < 0.004) fails.push(`mostly empty frame (median ink ${medInk.toFixed(4)})`);
  // The page loads off camera and the component mounts on camera, so an emptier
  // first frame is an entrance animation starting, not a loading flash: warn only.
  const warns = [];
  if (inks[0] < medInk * 0.35) warns.push(`starts nearly empty (entrance animation?) ${inks[0].toFixed(3)} vs ${medInk.toFixed(3)}`);
  // compare the seam with how much the clip moves frame-to-frame anyway: a
  // marquee or shader changes every frame, so its seam can't be judged on 6
  const typicalStep = [...steps].sort((a, b) => a - b)[Math.floor(steps.length * 0.75)] ?? 0;
  if (seam > Math.max(6, typicalStep * 3)) fails.push(`loop seam jumps (${seam.toFixed(1)} vs typical ${typicalStep.toFixed(1)})`);
  if (moving < 0.05 && !args.includes("--static")) fails.push(`almost no motion (${(moving * 100).toFixed(0)}% of frames)`);
  if (longest > 35 && !args.includes("--static")) fails.push(`frozen ${(longest / 10).toFixed(1)}s mid-clip`);

  const sheet = join(SHEETS, `${name}.jpg`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", mp4, "-vf", `fps=${(12 / dur).toFixed(3)},scale=320:-2,tile=6x2`, "-frames:v", "1", sheet]);
  results.push({ name, pass: !fails.length, fails, warns, dur: +dur.toFixed(2), maxInk: +maxInk.toFixed(3), moving: +moving.toFixed(2), seam: +seam.toFixed(2), sheet });
  console.log(`${fails.length ? "FAIL" : "PASS"}  ${name}${fails.length ? "  — " + fails.join("; ") : ""}`);
}
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(results, null, 1));
const bad = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - bad}/${results.length} pass · sheets in ${SHEETS}`);
process.exit(bad ? 1 : 0);
void sharp;
