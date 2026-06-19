/**
 * Choreography: snowfall-bg
 * Behavior: Canvas-based snowfall. Snowflakes are created immediately on mount
 *           and begin falling at speed=1. The canvas sizes itself to its
 *           container via offsetWidth/offsetHeight so the container must be
 *           rendered before the animation starts. Allow ~1 s settle then dwell
 *           ~3 s to capture a full sweep of flakes across the canvas.
 */
export default async function choreography(page, { W, H }) {
  // Park cursor away from canvas so it doesn't accidentally trigger anything.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Settle: let React render + canvas resize + first RAF loop fire.
  try {
    await page.waitForTimeout(1200);
  } catch (_) {}

  // Dwell to capture snowflakes spread across the canvas in mid-fall.
  try {
    await page.waitForTimeout(3000);
  } catch (_) {}

  // Brief final pause — no interaction needed.
  try {
    await page.mouse.move(W * 0.5, H * 0.4, { steps: 10 });
    await page.waitForTimeout(800);
  } catch (_) {}
}
