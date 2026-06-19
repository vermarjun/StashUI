/**
 * Choreography: TextType-TS-TW
 * Behavior: typewriter — types each string, pauses, deletes, cycles (loop:true).
 * Dwell long enough to show at least one full type + delete + next string start.
 * typingSpeed 50ms × ~20 chars = ~1s type, pauseDuration 2000ms, deletingSpeed 30ms.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);

  // Allow mount + first char to appear
  try {
    await wait(400);
  } catch (_) {}

  // Keep cursor away from the text
  try {
    await page.mouse.move(cx, Math.round(H * 0.85));
  } catch (_) {}

  // Watch one full cycle: ~1s typing + 2s pause + ~0.6s delete + gap ≈ 3.8s
  // 3.5s captures the typing, full pause, and beginning of delete phase
  try {
    await wait(3500);
  } catch (_) {}

  // Return mouse to bottom-centre for a clean loop
  try {
    await page.mouse.move(cx, Math.round(H * 0.85));
    await wait(200);
  } catch (_) {}
}
