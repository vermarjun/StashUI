/**
 * Capture choreography for ScrollReveal-TS-TW
 *
 * ScrollReveal uses GSAP ScrollTrigger to reveal words (opacity + blur)
 * as they scroll into view. The component starts with words dim (baseOpacity
 * 0.1) and blurred; scrolling down reveals them fully.
 *
 * Strategy:
 *   1. Settle mount + GSAP ScrollTrigger registration.
 *   2. Move mouse to centre so the trigger fires as content scrolls in.
 *   3. Wheel down gradually in steps to progressively reveal words.
 *   4. Pause at the fully-revealed state.
 *   5. Wheel back to the top so the loop can restart from the dim state.
 *   6. Brief final pause at top.
 */
export default async function capture(page, { W, H, wait }) {
  // GSAP + ScrollTrigger registration settle
  try {
    await wait(600);
  } catch (_) {}

  // Position mouse at centre to avoid stray hover effects
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(200);
  } catch (_) {}

  // Scroll down gradually to reveal words word-by-word
  try {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 200);
      await wait(200);
    }
  } catch (_) {}

  // Dwell at fully-revealed state
  try {
    await wait(1500);
  } catch (_) {}

  // Scroll back to top so the loop resets cleanly
  try {
    await page.keyboard.press('Home');
    await wait(300);
  } catch (_) {}

  // Fallback: wheel back to top
  try {
    for (let i = 0; i < 12; i++) {
      await page.mouse.wheel(0, -200);
      await wait(80);
    }
  } catch (_) {}

  // Final pause at top
  try {
    await wait(500);
  } catch (_) {}
}
