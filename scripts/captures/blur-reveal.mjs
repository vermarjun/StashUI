/**
 * Choreography: blur-reveal
 * Behavior: Three children (h2, two <p>) animate in sequentially — each blurs
 *           from 16 px to 0 and slides up 24 px. Duration 0.8 s + 0.25 s stagger
 *           ≈ total ~1.6 s. A tiny scroll down then back to top re-triggers the
 *           IntersectionObserver so the animation replays.
 */
export default async function choreography(page, { W, H }) {
  // Let the initial reveal play on load.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await page.waitForTimeout(2200); // wait for all three children to finish
  } catch (_) {}

  // Tiny scroll down to push the element out of view, then back to top to
  // re-trigger the IntersectionObserver and watch it replay.
  try {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(300);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(2200); // replay
  } catch (_) {}

  // Return cursor near start.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
}
