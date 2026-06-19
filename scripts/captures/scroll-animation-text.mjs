/**
 * Capture choreography for scroll-animation-text.
 *
 * The demo (text-scroll.tsx) shows three large text paragraphs that slide in
 * from left, right, and center as the user scrolls.  A 500 px hero section
 * sits above them with a "Scroll Down" heading.
 * Strategy: click to focus, wheel slowly down past the hero so each text
 * block slides into view one by one, dwell, then smooth-scroll back to top.
 */
export default async function capture(page, { W, H, wait }) {
  // Focus the page.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.4));
  } catch (_) {}

  try {
    await wait(500);
  } catch (_) {}

  // Slowly scroll down — each large text block enters viewport individually.
  try {
    for (let i = 0; i < 12; i++) {
      await page.mouse.wheel(0, 260);
      await wait(200);
    }
  } catch (_) {}

  // Dwell after last paragraph has animated in.
  try {
    await wait(900);
  } catch (_) {}

  // Smooth-scroll back to top.
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    await wait(900);
  } catch (_) {}
}
