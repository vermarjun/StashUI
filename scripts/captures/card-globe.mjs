/**
 * Capture choreography for card-globe
 *
 * The component is the raw Earth WebGL globe (cobe). The canvas auto-rotates
 * (phi += 0.003 per frame). No pointer interaction is wired up.
 *
 * Strategy:
 *   1. Give the WebGL canvas time to initialise and start spinning (~2s).
 *   2. Dwell at centre so the rotation is clearly captured.
 *   3. Gentle hover drift across the canvas (optional visual confirmation).
 *   4. Hold at centre for the final resting frame.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Wait for the WebGL globe to initialise — canvas needs time to paint
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Extra settle time for globe init + first rotation frames
  await wait(2000);

  // Move mouse to canvas centre and dwell — captures ongoing rotation
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(2500);
  } catch (_) {}

  // Gentle horizontal drift across the globe
  try {
    await page.mouse.move(cx - 80, cy, { steps: 25 });
    await wait(600);
    await page.mouse.move(cx + 80, cy, { steps: 35 });
    await wait(600);
  } catch (_) {}

  // Return to centre — resting frame
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(800);
  } catch (_) {}
}
