/**
 * Capture choreography for BlurText-TS-TW
 *
 * BlurText reveals words/letters from a blurred, offset state to clear on
 * mount, triggered by an IntersectionObserver. Each word is staggered by
 * `delay` ms (default 200 ms). With 6 words the full animation takes ~1.2 s
 * after the observer fires (which happens immediately since the component
 * starts in-view in the gallery iframe).
 *
 * Strategy:
 *   1. Wait for the IntersectionObserver to fire and the first frame to paint
 *      (~300 ms).
 *   2. Dwell ~2.5 s to let all words finish un-blurring.
 *   3. Move mouse to centre and dwell briefly so the settled state is clear.
 *   4. End near the starting position for a clean loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow IntersectionObserver to fire and animation to begin
  try {
    await wait(300);
  } catch (_) {}

  // Move mouse gently to centre — BlurText has no hover interaction but
  // a neutral position keeps the cursor out of the way
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}

  // Dwell to let all words complete their staggered blur-in
  try {
    await wait(2500);
  } catch (_) {}

  // Extra dwell on the fully-revealed state
  try {
    await wait(1000);
  } catch (_) {}

  // Return cursor to starting area for loop seam
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await wait(200);
  } catch (_) {}
}
