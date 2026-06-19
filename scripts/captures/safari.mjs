// safari: browser mockup with chrome toolbar and inner screenshot image.
// Choreography: drift across the wide browser frame from left to right,
// pausing at center, then ease back for a clean loop seam.
export default async function capture(page, { W, H, wait }) {
  // Let the image load inside the browser content area
  try {
    await wait(700);
  } catch (_) {}

  // Start on the left side, slightly below the toolbar
  try {
    await page.mouse.move(W * 0.2, H * 0.45, { steps: 1 });
    await wait(200);
  } catch (_) {}

  // Slow drift rightward across the browser frame
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 50 });
    await wait(800);
  } catch (_) {}

  // Continue to right side
  try {
    await page.mouse.move(W * 0.78, H * 0.55, { steps: 45 });
    await wait(700);
  } catch (_) {}

  // Dwell briefly on the right
  try {
    await wait(500);
  } catch (_) {}

  // Ease back to center
  try {
    await page.mouse.move(W * 0.5, H * 0.48, { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Return to start for loop
  try {
    await page.mouse.move(W * 0.2, H * 0.45, { steps: 35 });
    await wait(400);
  } catch (_) {}
}
