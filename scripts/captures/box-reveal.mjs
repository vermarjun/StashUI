/**
 * Choreography: box-reveal
 * Behavior: A coloured box sweeps over each text element then retracts, revealing
 *           the content underneath. Three items with delays 0 / 0.4 / 0.6 s each
 *           taking 0.5 s → total ~1.6 s. Dwell to let all three play.
 */
export default async function choreography(page, { W, H }) {
  // Park cursor, wait for animations on mount.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}

  // The component triggers via IntersectionObserver / mount — dwell to watch all
  // three box-reveal animations finish.
  try {
    await page.waitForTimeout(2500);
  } catch (_) {}

  // Scroll slightly to replay if observer re-fires, then return.
  try {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(300);
    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(2000);
  } catch (_) {}

  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
}
