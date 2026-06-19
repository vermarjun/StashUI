/**
 * Choreography: inspira-animated-beam
 * Behavior: SVG beams animate along curved paths from four source circles on
 *           the left to a large centre circle. Auto-plays; dwell ~3 s to let
 *           all four beams (staggered 0 / 1 / 1.5 / 2 s) complete a cycle.
 */
export default async function choreography(page, { W, H }) {
  // The animation is fully automatic — no user interaction required.
  // Park the cursor near the centre so it doesn't interfere with layout.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}

  // Dwell long enough for all staggered beams to become visible (max delay=2 s,
  // each beam takes ~1 s to traverse → need at least 3 s total).
  try {
    await page.waitForTimeout(3500);
  } catch (_) {}

  // Gentle drift away and back so the capture ends near the initial position.
  try {
    await page.mouse.move(W * 0.55, H * 0.45, { steps: 15 });
    await page.waitForTimeout(500);
    await page.mouse.move(W / 2, H / 2, { steps: 15 });
  } catch (_) {}
}
