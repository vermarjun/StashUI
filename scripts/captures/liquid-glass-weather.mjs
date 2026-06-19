/**
 * Capture choreography for liquid-glass-weather
 *
 * A 2-col weather dashboard rendered over a full-bleed mountain-scene photo.
 * Four LiquidGlassCards: hourly forecast (col-span-2), current temp, time/
 * location, daily forecast (col-span-2). Each card is draggable with elastic
 * spring. whileHover scale: 1.01.
 *
 * Strategy:
 *   1. Wait for background image + cards to paint.
 *   2. Slow pointer sweep across the hourly forecast card (top) — glass
 *      distortion and inner-highlight shift as pointer moves.
 *   3. Hover the current-temp card (left) and linger.
 *   4. Hover the time/location card (right) and linger.
 *   5. Drag the daily-forecast card (bottom, full width) slightly — spring
 *      snaps it back.
 *   6. Settle at grid centre for final resting frame.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Wait for the background image and glass cards to render
  try {
    await page.locator('.grid').first().waitFor({ state: 'visible', timeout: 4000 });
  } catch (_) {}
  await wait(700);

  // Phase 1: slow sweep across the top hourly-forecast card (col-span-2)
  // The card sits roughly in the upper ~28% of the component height
  const topCardY = cy - H * 0.22;
  try {
    await page.mouse.move(cx - 180, topCardY, { steps: 8 });
    await wait(200);
    await page.mouse.move(cx + 180, topCardY, { steps: 50 });
    await wait(500);
  } catch (_) {}

  // Phase 2: hover the current-temp card (lower-left quadrant)
  const leftCardX = cx - 100;
  const midCardY = cy + H * 0.02;
  try {
    await page.mouse.move(leftCardX, midCardY, { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Phase 3: hover the time/location card (lower-right quadrant)
  const rightCardX = cx + 100;
  try {
    await page.mouse.move(rightCardX, midCardY, { steps: 22 });
    await wait(600);
  } catch (_) {}

  // Phase 4: locate and drag the daily-forecast card (bottom, col-span-2)
  // It sits below the two mid cards — roughly bottom 35% of component
  const bottomCardY = cy + H * 0.25;
  try {
    await page.mouse.move(cx, bottomCardY, { steps: 18 });
    await wait(200);
    await page.mouse.down();
    await wait(100);
    await page.mouse.move(cx + 30, bottomCardY - 20, { steps: 15 });
    await wait(300);
    await page.mouse.up();
    await wait(600); // elastic spring back
  } catch (_) {}

  // Phase 5: gentle diagonal sweep to show glass distortion shift
  try {
    await page.mouse.move(cx - 160, cy - 80, { steps: 35 });
    await wait(300);
    await page.mouse.move(cx + 160, cy + 80, { steps: 40 });
    await wait(400);
  } catch (_) {}

  // Settle at grid centre — resting frame
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(500);
  } catch (_) {}
}
