// Render audit: opens /preview/<name> for each component in a real (system)
// Chrome, screenshots it, and measures "ink" = share of pixels that differ
// from the background. Blank or crashing demos fail.
//
//   node scripts/audit-render.mjs [names...] [--base URL] [--all] [--out file.json] [--min 0.002]
//
// Exit code 1 if any component fails. Default base: http://localhost:3000.
import { chromium } from "playwright";
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const BASE = opt("--base", "http://localhost:3000");
const OUT = opt("--out", null);
const MIN = parseFloat(opt("--min", "0.002"));
const flagVals = new Set(["--base", "--out", "--min"].map((k) => opt(k, null)).filter(Boolean));
let names = args.filter((a) => !a.startsWith("--") && !flagVals.has(a));
if (args.includes("--all") || names.length === 0) {
  names = JSON.parse(readFileSync("registry.json", "utf8")).items.map((i) => i.name);
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const results = [];
let idx = 0;
async function worker() {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 750 }, colorScheme: "dark" });
  while (idx < names.length) {
    const name = names[idx++];
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
    let ink = -1;
    try {
      await page.goto(`${BASE}/preview/${encodeURIComponent(name)}?view=detail&theme=dark`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForTimeout(2500);
      const { data, info } = await sharp(await page.screenshot())
        .resize(300, 188)
        .raw()
        .toBuffer({ resolveWithObject: true });
      const bg = [data[0], data[1], data[2]];
      let diff = 0;
      const n = info.width * info.height;
      for (let p = 0; p < n; p++) {
        const o = p * info.channels;
        if (Math.abs(data[o] - bg[0]) + Math.abs(data[o + 1] - bg[1]) + Math.abs(data[o + 2] - bg[2]) > 24) diff++;
      }
      ink = +(diff / n).toFixed(4);
    } catch (e) {
      errors.push("NAV: " + String(e.message).slice(0, 160));
    }
    const pass = ink >= MIN && errors.length === 0;
    results.push({ name, ink, pass, errors });
    console.log(`${pass ? "PASS" : "FAIL"}  ${name}  ink=${ink}${errors.length ? "  err=" + errors[0] : ""}`);
    await page.close();
  }
  await ctx.close();
}
await Promise.all(Array.from({ length: Math.min(6, names.length) }, worker));
await browser.close();
if (OUT) writeFileSync(OUT, JSON.stringify(results, null, 1));
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} pass`);
process.exit(failed.length ? 1 : 0);
