// android: SVG phone mockup — static chrome with an inner image.
// Choreography: gentle eased drift across the mockup for a subtle parallax
// feel, dwell at center, then ease back to start for a clean loop seam.
export default async function capture(page, { W, H, wait }) {
  // Initial settle — let the image load
  try {
    await wait(600);
  } catch (_) {}

  // Drift from top-left quadrant toward center
  try {
    await page.mouse.move(W * 0.3, H * 0.35, { steps: 1 });
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 40 });
    await wait(800);
  } catch (_) {}

  // Continue drift to bottom-right quadrant
  try {
    await page.mouse.move(W * 0.65, H * 0.62, { steps: 35 });
    await wait(700);
  } catch (_) {}

  // Ease back toward center-top to close the loop cleanly
  try {
    await page.mouse.move(W * 0.5, H * 0.38, { steps: 40 });
    await wait(600);
  } catch (_) {}

  // Return near start position
  try {
    await page.mouse.move(W * 0.3, H * 0.35, { steps: 30 });
    await wait(400);
  } catch (_) {}
}
