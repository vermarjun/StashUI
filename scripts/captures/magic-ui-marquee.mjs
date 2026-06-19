// magic-ui-marquee: horizontally scrolling cards/items loop forever via CSS
// animation. Speed ~1.1. Dwell ~3 s so multiple items scroll into view.
// No meaningful mouse interaction — park cursor off the marquee track.
export default async function capture(page, { W, H, wait }) {
  // Park mouse away so pauseOnHover (if enabled) doesn't interfere.
  try {
    await page.mouse.move(W * 0.5, H * 0.08, { steps: 5 });
  } catch (_) {}

  // Settle: let CSS animation tick and first frame settle.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell ~3 s — enough for several items to scroll through.
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle nudge to ensure we're still parked well clear.
  try {
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 5 });
    await wait(200);
  } catch (_) {}
}
