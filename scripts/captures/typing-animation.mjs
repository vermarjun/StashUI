/**
 * Choreography: typing-animation
 * Behavior: typewriter types each character at ~80 ms, pauses, then deletes and
 * cycles to the next word (loop=true). Three words in demo.
 * Strategy: speed=1.1 in sidecar compresses time slightly; dwell ~3.5 s to capture
 * a full type-out of the first word and the start of deletion.
 */
export default async function choreograph({ page, W, H }) {
  // Park mouse in neutral position; no hover interaction
  try {
    await page.mouse.move(W * 0.1, H * 0.1);
  } catch (e) {
    // non-fatal
  }

  // Wait for in-view trigger, then dwell through typing + pause start
  try {
    await page.waitForTimeout(3500);
  } catch (e) {
    // non-fatal
  }
}
