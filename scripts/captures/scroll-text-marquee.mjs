/**
 * Choreography: scroll-text-marquee  (source: scroll-text-marque.tsx)
 * Behavior: continuous scroll-velocity marquee. The demo is a stub that renders the component
 *           with its own default content self-contained. baseVelocity drives constant motion;
 *           scroll interaction momentarily accelerates it.
 * Strategy: center-aligned, no scroll — dwell ~3s to show the continuous marquee in motion,
 *           then a brief scroll nudge to show velocity response.
 */
export default async function choreograph(page, { W, H }) {
  // Allow marquee to start moving (delay prop).
  try {
    await page.waitForTimeout(800);
  } catch (e) {}

  // Dwell on continuous motion.
  try {
    await page.waitForTimeout(1500);
  } catch (e) {}

  // Brief scroll nudge to show velocity response.
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(600);
    await page.mouse.wheel(0, -200);
    await page.waitForTimeout(600);
  } catch (e) {}

  // Dwell on settled continuous motion.
  try {
    await page.waitForTimeout(1000);
  } catch (e) {}
}
