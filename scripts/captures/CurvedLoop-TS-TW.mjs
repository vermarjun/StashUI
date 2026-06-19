/**
 * Capture choreography for CurvedLoop-TS-TW
 *
 * CurvedLoop animates marquee text along a quadratic Bézier SVG path in a
 * continuous rAF loop. The component also supports drag interaction: dragging
 * left/right changes the direction and velocity of the marquee.
 *
 * Strategy:
 *   1. Settle ~500 ms for the text measurement + initial offset setup.
 *   2. Dwell ~2 s to show the looping marquee in motion.
 *   3. Drag left briefly to reverse direction, then release.
 *   4. Dwell to show the reversed/settling marquee.
 *   5. End with mouse released near centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow text measurement and first frame
  try {
    await wait(500);
  } catch (_) {}

  // Dwell to show the auto-scroll marquee
  try {
    await wait(2000);
  } catch (_) {}

  // Drag left to briefly reverse the marquee direction
  try {
    await page.mouse.move(W * 0.6, H * 0.5, { steps: 10 });
    await page.mouse.down();
    await wait(100);
    await page.mouse.move(W * 0.3, H * 0.5, { steps: 20 });
    await wait(300);
    await page.mouse.up();
  } catch (_) {}

  // Dwell to capture the momentum settle and resumed scroll
  try {
    await wait(2000);
  } catch (_) {}

  // Return mouse to centre
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await wait(300);
  } catch (_) {}
}
