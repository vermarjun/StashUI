export default async function capture(page, { W, H, cfg, wait }) {
  // The demo wires pathLengths to static MotionValues at 0.5 — the component
  // is sticky and the SVG paths are driven by those values.
  // For the gallery capture we trigger the scroll-based version by scrolling
  // the page so the sticky element travels through its pin range, which causes
  // pathLength to animate from 0 → 1 as scroll progresses.
  await wait(600);

  // Scroll down in several increments to draw the beams progressively
  const steps = 5;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.65));
    } catch (_) {}
    await wait(470);
  }

  // Hold at the end so all five coloured paths are fully drawn
  await wait(600);

  // Return to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(800);
}
