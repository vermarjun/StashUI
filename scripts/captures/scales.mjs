/**
 * Capture choreography for: scales
 * Behaviour: pure CSS repeating-linear-gradient pattern at 315° — diagonal
 * stripe/scale grid. Static (no animation, no pointer reactivity).
 * Strategy: settle briefly, sweep mouse slowly across the pattern to show
 * the diagonal lines at various depths, then dwell and return to start.
 */
export default async function capture(page, { W, H, wait }) {
  // Park at top-left
  try {
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 5 });
  } catch (_) {}

  // Settle: CSS paint
  try {
    await wait(400);
  } catch (_) {}

  // Slow horizontal sweep left → right to show the repeating pattern
  try {
    await page.mouse.move(W * 0.9, H * 0.5, { steps: 40 });
    await wait(500);
  } catch (_) {}

  // Sweep diagonally back toward top-left
  try {
    await page.mouse.move(W * 0.2, H * 0.3, { steps: 30 });
    await wait(500);
  } catch (_) {}

  // Dwell in centre to let the viewer absorb the pattern
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 15 });
    await wait(1500);
  } catch (_) {}

  // Return to start for loop seam
  try {
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 15 });
    await wait(300);
  } catch (_) {}
}
