/**
 * Capture choreography for background-beams.
 *
 * Effect: 50 animated SVG paths rendered with motion.linearGradient animated
 * from (0,0) to (100,100)% over 10–20 s, creating travelling light streaks
 * across a dark background. Colour palette: cyan → indigo → violet.
 * Strategy:
 *   1. Brief settle (~1 s) so several beam animations begin travelling.
 *   2. Dwell at centre for 2 s — the gradients sweep most dramatically here.
 *   3. Slow mouse drift from bottom-left to top-right to observe beam colours.
 *   4. Return to centre for loop seam.
 *
 * Note: BackgroundBeams has no pointer reactivity; mouse movement is purely
 * cosmetic for the preview recording.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle so beam animations start moving.
  try { await wait(1000); } catch (_) {}

  // Dwell at centre — beams converge here.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await wait(2000);
  } catch (_) {}

  // Slow drift from bottom-left to top-right.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.8), { steps: 10 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.2), { steps: 45 });
    await wait(1000);
  } catch (_) {}

  // Return to centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
    await wait(500);
  } catch (_) {}
}
