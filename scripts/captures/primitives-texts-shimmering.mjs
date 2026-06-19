/**
 * Choreography: primitives-texts-shimmering
 * Behavior: each character independently oscillates between base color and
 * shimmer color on a repeating loop (duration=1s per char, staggered by
 * duration/textLength). Auto-playing — no pointer interaction needed.
 * The wave passes left→right across the text in ~1s, then repeats.
 * Dwell ~3s to capture multiple shimmer waves.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in a corner — no hover effect on this component.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
  } catch (_) {}

  // Brief settle for mount.
  try {
    await wait(300);
  } catch (_) {}

  // Dwell — each shimmer wave cycles every ~1s (default duration).
  // 3s gives ~3 full passes, clearly showing the shimmer animation.
  try {
    await wait(3000);
  } catch (_) {}

  // Hold a moment on mid-animation.
  try {
    await wait(400);
  } catch (_) {}

  // Return near start for loop cut.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
