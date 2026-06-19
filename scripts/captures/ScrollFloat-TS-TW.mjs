/**
 * Choreography: ScrollFloat-TS-TW
 * Behavior: GSAP ScrollTrigger — chars float up from below as the user scrolls.
 * The scrub is tied to scroll position, so we must wheel down to reveal the
 * animation, then wheel back to top so the loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow mount + GSAP plugin registration
  try {
    await wait(600);
  } catch (_) {}

  // Position mouse near text centre (not blocking it)
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.1));
  } catch (_) {}

  // Wheel down in moderate steps — scrub drives each char's float-in
  try {
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 220);
      await wait(180);
    }
  } catch (_) {}

  // Dwell at the fully-revealed state
  try {
    await wait(800);
  } catch (_) {}

  // Wheel back to top so the clip can loop cleanly from the start state
  try {
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, -220);
      await wait(150);
    }
  } catch (_) {}

  try {
    await wait(400);
  } catch (_) {}
}
