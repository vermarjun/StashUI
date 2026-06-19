/**
 * Choreography: scroll-text-marquee-bidirectional  (source: animationtwo.tsx)
 * Behavior: single marquee row with scrollDependent=true — direction reverses based on
 *           scroll velocity. Without scrolling it moves in the base direction; scrolling
 *           up/down flips the direction.
 * Strategy: top-aligned, scroll true — start at top, wheel down to flip direction,
 *           pause, wheel back up to show reversal, dwell, return to top.
 */
export default async function choreograph(page, { W, H }) {
  // Allow component to mount and begin moving.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(600);
  } catch (e) {}

  // Dwell on default direction.
  try {
    await page.waitForTimeout(1200);
  } catch (e) {}

  // Scroll down to trigger velocity-based direction change.
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(700);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(800);
  } catch (e) {}

  // Dwell with reversed/accelerated direction.
  try {
    await page.waitForTimeout(1000);
  } catch (e) {}

  // Scroll back up to show opposite velocity response.
  try {
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(700);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(800);
  } catch (e) {}

  // Settle and return to top.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(700);
  } catch (e) {}
}
