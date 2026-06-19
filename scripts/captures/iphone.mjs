// iphone: div-based phone mockup — static chrome framing an inner image.
// Choreography: slow eased drift across the mockup to evoke parallax depth,
// then return near start for a seamless loop.
export default async function capture(page, { W, H, wait }) {
  // Initial settle — let the image load inside the phone frame
  try {
    await wait(600);
  } catch (_) {}

  // Begin at upper-left of the mockup area
  try {
    await page.mouse.move(W * 0.32, H * 0.3, { steps: 1 });
    await wait(200);
  } catch (_) {}

  // Slow drift toward center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 45 });
    await wait(700);
  } catch (_) {}

  // Continue to lower-right
  try {
    await page.mouse.move(W * 0.68, H * 0.65, { steps: 38 });
    await wait(700);
  } catch (_) {}

  // Ease back up to center
  try {
    await page.mouse.move(W * 0.5, H * 0.42, { steps: 40 });
    await wait(600);
  } catch (_) {}

  // Return to start
  try {
    await page.mouse.move(W * 0.32, H * 0.3, { steps: 30 });
    await wait(400);
  } catch (_) {}
}
