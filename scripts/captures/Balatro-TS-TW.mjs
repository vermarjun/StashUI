/**
 * Capture choreography for Balatro-TS-TW
 *
 * Balatro is a WebGL OGL swirling paint shader with mouse interaction:
 * moving the cursor horizontally shifts the spin direction and distortion.
 * isRotate=true means the pattern auto-rotates; spinSpeed=7.0 is fast.
 * The demo wraps the shader in a sized div (height 400px).
 *
 * Strategy:
 *   1. Settle ~2 s for WebGL init and initial rotation to produce visible swirl.
 *   2. Dwell ~1 s watching the passive swirl.
 *   3. Slow horizontal drift left→right across the centre row to show mouse
 *      influence on the paint spin direction.
 *   4. Return to centre, dwell ~1.5 s for the looped swirl to resolve nicely.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 6000 });
  } catch (e) {
    console.warn('Balatro: canvas not found', e.message);
  }

  // WebGL + shader compile settle
  try {
    await wait(2000);
  } catch (_) {}

  const cy = Math.round(H * 0.5);

  // Passive dwell
  try {
    await wait(1000);
  } catch (_) {}

  // Slow left→right drift to trigger mouse spin influence
  try {
    await page.mouse.move(Math.round(W * 0.1), cy, { steps: 5 });
    await page.mouse.move(Math.round(W * 0.9), cy, { steps: 40 });
  } catch (e) {
    console.warn('Balatro: mouse drift error', e.message);
  }

  try {
    await wait(500);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(Math.round(W * 0.5), cy, { steps: 20 });
  } catch (_) {}

  // Final dwell — swirl pattern loops cleanly
  try {
    await wait(1500);
  } catch (_) {}
}
