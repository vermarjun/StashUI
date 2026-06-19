// marquee (effects/): horizontally scrolling pill badges loop forever via CSS.
// pauseOnHover is set in the demo — keep mouse off the strip. Speed ~1.1.
// Dwell ~3 s so all 6 items scroll through at least once.
export default async function capture(page, { W, H, wait }) {
  // Park mouse well above the marquee strip to avoid triggering pauseOnHover.
  try {
    await page.mouse.move(W * 0.5, H * 0.15, { steps: 5 });
  } catch (_) {}

  // Settle: let the animation start and layout stabilise.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell: at 18 s duration (demo default) the strip scrolls ~1/6 per 3 s —
  // enough to see several new items slide in from the right.
  try {
    await wait(3000);
  } catch (_) {}

  // Keep parked — no further interaction needed.
  try {
    await wait(200);
  } catch (_) {}
}
