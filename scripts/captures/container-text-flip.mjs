/**
 * Choreography: container-text-flip
 * Behavior: The container flips between words ["better","faster","beautiful",
 *           "modern","awesome"] every 2500 ms with a width transition. Auto-plays.
 * Strategy: dwell ~3.5 s to capture at least one full flip + the container width
 *           animation that accompanies each word change.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse away from component — no hover interaction
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 6 });
  } catch (_) {}

  // Brief settle to let the first word render
  try {
    await wait(300);
  } catch (_) {}

  // Dwell ~3.5 s — covers one full flip cycle (2500 ms) plus some overlap
  try {
    await wait(3500);
  } catch (_) {}

  // Return to neutral for clean loop
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
    await wait(200);
  } catch (_) {}
}
