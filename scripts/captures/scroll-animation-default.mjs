/**
 * Capture choreography for scroll-animation-default.
 *
 * The demo (scroll-element.tsx) shows a 3-column masonry grid of images that
 * blur/fade in from below as they enter the viewport (viewport.once = true).
 * A 500 px hero section sits above them with a "Scroll Down" heading.
 * Strategy: click to focus, wheel slowly down past the hero to trigger all
 * image reveal animations, dwell, then smooth-scroll back to top.
 */
export default async function capture(page, { W, H, wait }) {
  // Focus so wheel events land on the right scroll container.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.4));
  } catch (_) {}

  // Brief pause — let images start loading.
  try {
    await wait(500);
  } catch (_) {}

  // Scroll down past the hero and through the image grid.
  try {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 300);
      await wait(160);
    }
  } catch (_) {}

  // Dwell — all in-viewport items have now animated in.
  try {
    await wait(900);
  } catch (_) {}

  // Smooth-scroll back to top for loop seam.
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    await wait(900);
  } catch (_) {}
}
