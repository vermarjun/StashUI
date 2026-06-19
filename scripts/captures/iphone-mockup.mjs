// iphone-mockup: SVG iPhone mockup with a real image inside, set against a
// gradient background. Demo is fully populated (not a stub).
// Choreography: slow eased drift across the phone frame for a parallax feel,
// dwell at center, then return near start for a seamless loop.
export default async function capture(page, { W, H, wait }) {
  // Let the image inside the SVG frame load
  try {
    await wait(700);
  } catch (_) {}

  // Start upper-left of the mockup area
  try {
    await page.mouse.move(W * 0.35, H * 0.28, { steps: 1 });
    await wait(200);
  } catch (_) {}

  // Slow drift toward center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 48 });
    await wait(800);
  } catch (_) {}

  // Continue drift to lower-right
  try {
    await page.mouse.move(W * 0.64, H * 0.68, { steps: 40 });
    await wait(700);
  } catch (_) {}

  // Ease back to center-upper
  try {
    await page.mouse.move(W * 0.5, H * 0.4, { steps: 42 });
    await wait(600);
  } catch (_) {}

  // Return to start
  try {
    await page.mouse.move(W * 0.35, H * 0.28, { steps: 30 });
    await wait(400);
  } catch (_) {}
}
