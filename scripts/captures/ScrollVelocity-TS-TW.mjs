/**
 * Capture choreography for ScrollVelocity-TS-TW
 *
 * ScrollVelocity (VelocityText) uses motion/react's useScroll + useVelocity
 * to speed up or slow down the marquee tracks in response to window scroll
 * velocity. Two tracks run in opposite directions by default.
 *
 * Strategy:
 *   1. Settle mount + rAF setup.
 *   2. Move mouse to centre of the page.
 *   3. Wheel down quickly (large delta) to spike scroll velocity and show
 *      the accelerated marquee.
 *   4. Pause to let velocity spring settle.
 *   5. Wheel back up to show the reverse acceleration.
 *   6. Pause for spring to settle again, then end near top for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount + rAF settle
  try {
    await wait(500);
  } catch (_) {}

  // Centre mouse on the scrollable area
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(200);
  } catch (_) {}

  // Fast wheel down to spike velocity
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, 300);
      await wait(80);
    }
  } catch (_) {}

  // Let the spring velocity decay and the marquee settle
  try {
    await wait(1500);
  } catch (_) {}

  // Wheel back up to show reverse spike
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, -300);
      await wait(80);
    }
  } catch (_) {}

  // Let spring settle
  try {
    await wait(1500);
  } catch (_) {}

  // Move mouse to top for loop seam
  try {
    await page.mouse.move(W / 2, H * 0.05, { steps: 14 });
    await wait(300);
  } catch (_) {}
}
