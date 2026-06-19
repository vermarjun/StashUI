/**
 * Capture choreography for: shooting-stars
 * Behaviour: SVG shooting stars streak diagonally across a dark bg on
 * randomised delays (1.2–4.2 s). No pointer interaction needed.
 * Strategy: settle ~1 s for the first star to spawn, then dwell ~4 s to
 * catch 1–2 full streaks, then park mouse near start position.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in a corner so it never occludes a streak
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
  } catch (_) {}

  // Settle: let the component mount and the first star spawn
  try {
    await wait(1000);
  } catch (_) {}

  // Dwell: first streak traverses the canvas (~1–3 s depending on speed)
  try {
    await wait(2000);
  } catch (_) {}

  // Short pause — second star may appear during the random delay window
  try {
    await wait(1500);
  } catch (_) {}

  // End near start — clean loop seam
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
    await wait(300);
  } catch (_) {}
}
