/**
 * Choreography: tetris
 * Behavior: DOM-based animated tetris background. Grid is computed via
 *           ResizeObserver + a 50 ms setTimeout after mount. Blocks drop one
 *           row per 1000 ms setInterval tick. Allow ~1 s settle (resize calc +
 *           first tick), then dwell ~3.5 s so several rows of blocks are
 *           visible falling. Clicking a cell removes it — avoid clicks.
 */
export default async function choreography(page, { W, H }) {
  // Park cursor at center — avoid clicking any cells.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Settle: wait for ResizeObserver + 50 ms timeout + grid render.
  try {
    await page.waitForTimeout(1200);
  } catch (_) {}

  // Dwell through ~3.5 s worth of ticks (≈3–4 block drops visible).
  try {
    await page.waitForTimeout(3500);
  } catch (_) {}

  // Move to top-center to show blocks falling from the top edge.
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 15 });
    await page.waitForTimeout(1000);
  } catch (_) {}

  // Return to center for exit frame.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await page.waitForTimeout(500);
  } catch (_) {}
}
