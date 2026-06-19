/**
 * Choreography: inspira-wavy-background
 * Behavior: Canvas simplex-noise wavy lines rendered over a black fill at
 *           speed="fast" (ntRef +=0.002/frame). The canvas resizes to its
 *           parent on mount and begins rendering immediately. Allow ~1.5 s
 *           settle for the noise field to develop visible wave shapes, then
 *           dwell ~3 s to show a full sweep of the colored waves.
 */
export default async function choreography(page, { W, H }) {
  // Center cursor while canvas initialises.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Settle: React hydration + canvas resize + noise render loop start.
  try {
    await page.waitForTimeout(1500);
  } catch (_) {}

  // Dwell: let multiple wave colors scroll horizontally across the canvas.
  try {
    await page.waitForTimeout(3000);
  } catch (_) {}

  // Slow horizontal sweep to emphasise the wave motion left → right.
  try {
    await page.mouse.move(W * 0.2, H * 0.5, { steps: 30 });
    await page.waitForTimeout(500);
    await page.mouse.move(W * 0.8, H * 0.5, { steps: 30 });
    await page.waitForTimeout(500);
    await page.mouse.move(W / 2, H / 2, { steps: 14 });
    await page.waitForTimeout(800);
  } catch (_) {}
}
