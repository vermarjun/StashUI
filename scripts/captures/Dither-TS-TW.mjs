/**
 * Capture choreography for Dither-TS-TW
 *
 * Dither uses React Three Fiber + a postprocessing Bayer-matrix dither effect
 * over a Perlin FBM wave shader. enableMouseInteraction=true: moving the mouse
 * creates a local brightness dip (the "hole" in the wave pattern).
 * pixelSize=2 → visible pixel blocks; colorNum=4 → 4-level palette.
 *
 * Strategy:
 *   1. Settle ~2.5 s for R3F renderer, EffectComposer, and first animation
 *      frames to produce a visually rich dithered pattern.
 *   2. Slow diagonal drift top-left → bottom-right to show the mouse "dip"
 *      rippling across the dithered grid.
 *   3. Return to centre and dwell ~2 s for the FBM wave to cycle visibly.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 8000 });
  } catch (e) {
    console.warn('Dither: canvas not found', e.message);
  }

  // R3F + EffectComposer init takes a beat
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Diagonal drift — top-left to bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 4 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.8), { steps: 30 });
  } catch (e) {
    console.warn('Dither: diagonal drift error', e.message);
  }

  try {
    await wait(400);
  } catch (_) {}

  // Return to centre and dwell
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(2000);
  } catch (_) {}
}
