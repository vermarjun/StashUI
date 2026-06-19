/**
 * Choreography: word-rotate
 * Behavior: a word rotates (slide/fade transition) to the next word on a timer.
 * Strategy: dwell ~3.5 s to capture at least one full rotation transition.
 */
export default async function choreograph({ page, W, H }) {
  // Park mouse in neutral position
  try {
    await page.mouse.move(W * 0.1, H * 0.1);
  } catch (e) {
    // non-fatal
  }

  // Dwell to capture the rotation transition (typically ~2–3 s per word)
  try {
    await page.waitForTimeout(3500);
  } catch (e) {
    // non-fatal
  }
}
