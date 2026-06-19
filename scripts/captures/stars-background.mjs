/**
 * Capture choreography for: stars-background
 * Behaviour: canvas renders a field of twinkling white dots on a dark bg.
 * All animation is autonomous (opacity sine-wave per star). No pointer
 * interaction; dwell long enough to show at least one full twinkle cycle
 * (~1–2 s per star at default speed 0.5–1 rad/s).
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse off-centre so nothing obscures the star field
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 5 });
  } catch (_) {}

  // Settle: canvas ResizeObserver + initial star generation
  try {
    await wait(600);
  } catch (_) {}

  // Dwell phase 1: stars begin twinkling
  try {
    await wait(2000);
  } catch (_) {}

  // Dwell phase 2: catch slower-twinkle stars completing their cycle
  try {
    await wait(2000);
  } catch (_) {}

  // Return to near-start for a clean loop
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 5 });
    await wait(400);
  } catch (_) {}
}
