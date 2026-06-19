/**
 * Capture choreography for card-globe-white
 *
 * A white-background card with a large gradient headline ("DESIGN A
 * MASTERPIECE") and a white/light Earth WebGL globe (cobe, dark=0) that
 * overflows the right edge of the card. The globe auto-rotates.
 *
 * Strategy:
 *   1. Allow ~2s for WebGL init and first globe paint.
 *   2. Dwell at the card centre to capture the rotating globe.
 *   3. Slow drift toward the globe (right side) so it fills the frame.
 *   4. Return to the text area, then settle at card centre.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Wait for the globe canvas to appear
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Extra settle time for WebGL globe init
  await wait(2000);

  // Move to card centre and dwell — lets globe rotation accumulate
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(2500);
  } catch (_) {}

  // Drift toward the globe (right half of viewport)
  try {
    await page.mouse.move(cx + 120, cy + 30, { steps: 28 });
    await wait(700);
  } catch (_) {}

  // Drift back toward headline text area (upper-left of card)
  try {
    await page.mouse.move(cx - 100, cy - 60, { steps: 24 });
    await wait(600);
  } catch (_) {}

  // Settle at card centre — resting frame
  try {
    await page.mouse.move(cx, cy, { steps: 14 });
    await wait(700);
  } catch (_) {}
}
