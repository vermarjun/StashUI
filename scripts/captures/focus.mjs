/**
 * Choreography: focus (inspira-focus)
 * Behavior: Two Focus instances.
 *   1) Auto-cycling — "Build Beautiful Interfaces": one word is in focus
 *      (sharp) while others blur; cycles every (0.5 + 1.5) * 1000 = 2000 ms.
 *   2) Manual hover — "Hover Each Word": hover each word to focus it.
 * Strategy: let auto-cycle play through ~two words (~3.5 s), then move the
 *           mouse over the words in the second (manual) instance to show hover.
 *           Demo background is bg-neutral-950, so mouse should be clearly visible.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse away from the manual instance initially
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 6 });
  } catch (_) {}

  // Dwell ~3.5 s — auto-cycle plays through at least two word transitions
  try {
    await wait(3500);
  } catch (_) {}

  // Hover across words in the second (manual) row — estimated to sit in the
  // lower half of the component (~65–80 % of H). Sweep left → right.
  try {
    await page.mouse.move(W * 0.2, H * 0.72, { steps: 12 });
    await wait(600);
    await page.mouse.move(W * 0.5, H * 0.72, { steps: 12 });
    await wait(600);
    await page.mouse.move(W * 0.8, H * 0.72, { steps: 12 });
    await wait(500);
  } catch (_) {}

  // Return near start for loop seam
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
