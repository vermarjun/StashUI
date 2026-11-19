// Used by scripts/rshot.sh on the recording Mac: load one preview, optionally
// hover an element, screenshot it, print page errors and failed requests.
import { chromium } from "playwright";

const [, , name, out, sel = "", w = "1280", h = "800"] = process.argv;
const b = await chromium.launch({
  args: [
    "--autoplay-policy=no-user-gesture-required",
    "--use-angle=metal",
    "--enable-gpu",
    "--ignore-gpu-blocklist",
  ],
});
const p = await b.newPage({ viewport: { width: +w, height: +h }, colorScheme: "dark" });
const errs = [];
p.on("pageerror", (e) => errs.push("pageerror: " + e.message.slice(0, 300)));
p.on("console", (m) => {
  if (m.type() === "error") errs.push("console: " + m.text().slice(0, 300));
});
p.on("response", (r) => {
  if (r.status() >= 400) errs.push(`http ${r.status()}: ${r.url().slice(0, 200)}`);
});
await p.goto(
  `http://localhost:${process.env.RSHOT_PORT || 3200}/preview/${encodeURIComponent(name)}?view=detail&theme=dark&align=center&scroll=false`,
  { waitUntil: "load", timeout: 120000 },
);
await p.waitForTimeout(3000);
if (sel) {
  const box = await p.locator(sel).first().boundingBox().catch(() => null);
  if (box) await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
  else errs.push(`selector not found: ${sel}`);
  await p.waitForTimeout(1500);
}
await p.screenshot({ path: out });
console.log(errs.length ? errs.slice(0, 12).join("\n") : "no errors");
await b.close();
