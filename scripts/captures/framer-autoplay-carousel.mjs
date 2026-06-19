// Framer autoplay carousel – autoplay fires every 3 s (duration default).
// Strategy: dwell ~4 s so at least one auto-advance is captured, move the
// mouse *off* the carousel so isHovered stays false and the interval keeps
// running, then move back near the end to show the progress dots.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let the component mount, images load, and the first interval start
  await wait(800);

  // Move mouse to a neutral position outside the carousel so autoplay runs
  // (onMouseEnter on the container pauses it)
  try {
    await page.mouse.move(W * 0.5, H * 0.05, { steps: 6 });
  } catch (_) {}

  // Dwell long enough for ~1.5 auto-advances (3 s each, speed 1× → ~4.5 s real)
  await wait(4200);

  // Hover briefly over the progress dot bar so it's visible in the clip
  try {
    const dotsY = H * 0.12 + 400 - 16; // bottom-4 of the 400px image
    await page.mouse.move(W * 0.5, dotsY, { steps: 5 });
  } catch (_) {}
  await wait(500);
}
