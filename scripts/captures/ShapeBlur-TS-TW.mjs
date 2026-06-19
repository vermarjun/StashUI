/**
 * Capture script: ShapeBlur-TS-TW
 * Choreography: Three.js shader — a blurred rounded-rect follows the damped
 * cursor. Settle ~1.5s then sweep mouse across so the shape chases visibly.
 * End near viewport center so the shape is centered at loop end.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Allow Three.js renderer to initialise and first frame to paint
  await page.waitForTimeout(1500);

  try {
    // Move to center to make shape appear
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 1 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('ShapeBlur: initial position error', e.message);
  }

  try {
    // Sweep left
    await page.mouse.move(W * 0.15, H * 0.5, { steps: 45 });
    await page.waitForTimeout(300);
    // Sweep right
    await page.mouse.move(W * 0.85, H * 0.5, { steps: 60 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('ShapeBlur: horizontal sweep error', e.message);
  }

  try {
    // Sweep down
    await page.mouse.move(W * 0.5, H * 0.8, { steps: 40 });
    await page.waitForTimeout(250);
    // Sweep up-left
    await page.mouse.move(W * 0.2, H * 0.2, { steps: 50 });
    await page.waitForTimeout(250);
  } catch (e) {
    console.warn('ShapeBlur: vertical sweep error', e.message);
  }

  try {
    // Return to center
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 30 });
    await page.waitForTimeout(600);
  } catch (e) {
    console.warn('ShapeBlur: return error', e.message);
  }
}
