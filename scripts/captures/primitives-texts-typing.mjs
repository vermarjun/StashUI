/**
 * Choreography: primitives-texts-typing
 * Behavior: TypingText types characters one by one (duration=80ms/char for
 * the first instance, 60ms/char for the looping one). "Hello, World!" = 13
 * chars × 80ms = ~1.04s. The looping instance cycles through 3 phrases
 * (avg ~25 chars × 60ms = 1.5s each + 1.5s holdDelay) ≈ ~3s per phrase.
 * Both have inView=true and fire on mount. Dwell ~3.5s to see the first
 * phrase complete and the looping instance deep into its cycle.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from cursor blink area to avoid obscuring the text.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
  } catch (_) {}

  // Settle — typing starts immediately.
  try {
    await wait(300);
  } catch (_) {}

  // Dwell while "Hello, World!" types out (~1.1s) and the looping instance
  // types its first phrase and begins erasing.
  try {
    await wait(3500);
  } catch (_) {}

  // Brief hold so the cursor blink is visible after typing settles.
  try {
    await wait(400);
  } catch (_) {}

  // Return near start for loop cut.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
