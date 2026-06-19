/**
 * Capture choreography for ColorBends-TS-TW
 *
 * ColorBends is a Three.js WebGL shader that renders iterative warp/band
 * patterns. Mouse movement shifts the pointer uniform, which gently biases
 * the UV offset (mouseInfluence=1, parallax=0.5). autoRotate=0 so the
 * rotation is fixed; speed=0.2 is slow. The fixed demo wrapper is 600px.
 *
 * Strategy:
 *   1. Settle ~2 s for Three.js + shader init.
 *   2. Dwell ~1 s on the idle pattern.
 *   3. Gentle S-curve mouse drift across the canvas to show the parallax
 *      / pointer warping effect in the colour bands.
 *   4. Return to centre, dwell ~2 s for the pattern to flow back.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 6000 });
  } catch (e) {
    console.warn('ColorBends: canvas not found', e.message);
  }

  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Idle dwell
  try {
    await wait(1000);
  } catch (_) {}

  // Gentle S-curve drift — top-left → bottom-right → top-right
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.3), { steps: 12 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.5), { steps: 20 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.75), { steps: 20 });
    await wait(200);
    await page.mouse.move(cx, cy, { steps: 15 });
  } catch (e) {
    console.warn('ColorBends: mouse drift error', e.message);
  }

  // Dwell — let the warp settle back to a clean centre state
  try {
    await wait(2000);
  } catch (_) {}
}
