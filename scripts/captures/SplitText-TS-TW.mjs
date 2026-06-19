/**
 * Choreography: SplitText-TS-TW
 * Behavior: GSAP SplitText — chars/words animate in from opacity 0 / y 40 on
 * mount (IntersectionObserver, once:true). After the animation completes the
 * text is static. A small scroll nudge re-exposes the trigger if needed.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle: give fonts + GSAP time to initialise
  try {
    await wait(500);
  } catch (_) {}

  // Move mouse away from the text so chars are fully visible
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.1), { steps: 8 });
  } catch (_) {}

  // Dwell while the staggered char animation plays (duration 1.25s + stagger)
  try {
    await wait(2500);
  } catch (_) {}

  // Tiny scroll nudge to verify the settled (fully visible) state is on screen
  try {
    await page.mouse.move(cx, cy);
    await page.mouse.wheel(0, 60);
    await wait(300);
    await page.mouse.wheel(0, -60);
  } catch (_) {}

  // Final dwell on settled text
  try {
    await wait(600);
  } catch (_) {}

  // Return to near start to keep loop seam tidy
  try {
    await page.mouse.move(cx, Math.round(H * 0.1), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
