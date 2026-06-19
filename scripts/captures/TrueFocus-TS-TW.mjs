/**
 * Choreography: TrueFocus-TS-TW
 * Behavior: words blur except the focused one; focus index cycles automatically
 * every (animationDuration + pauseBetweenAnimations) * 1000ms = 1500ms.
 * Dwell ~3.5s to show at least two full focus cycles.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);

  // Allow mount + motion/react layout measurement
  try {
    await wait(500);
  } catch (_) {}

  // Keep mouse below the component so hover-manual-mode isn't triggered
  try {
    await page.mouse.move(cx, Math.round(H * 0.85));
  } catch (_) {}

  // Watch the auto-cycle: 1.5s per word × ~3 words ≈ 4.5s; 3.5s captures 2+
  try {
    await wait(3500);
  } catch (_) {}

  // Return to bottom-centre for a clean loop seam
  try {
    await page.mouse.move(cx, Math.round(H * 0.85));
    await wait(200);
  } catch (_) {}
}
