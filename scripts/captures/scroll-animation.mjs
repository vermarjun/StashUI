/**
 * Capture choreography for scroll-animation.
 *
 * The demo (scroll-animation.demo.tsx) renders a bare <ScrollAnimation> with
 * no children — effectively an empty div that fades/blurs in from below.
 * Strategy: click to focus, wheel down one step to trigger the single element
 * animation, dwell, then smooth-scroll back to top for a clean loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Focus.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.5));
  } catch (_) {}

  try {
    await wait(500);
  } catch (_) {}

  // Scroll down — let the ScrollAnimation element enter the viewport.
  try {
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 240);
      await wait(200);
    }
  } catch (_) {}

  // Dwell so the fade/blur-in transition completes.
  try {
    await wait(900);
  } catch (_) {}

  // Smooth-scroll back to top.
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    await wait(800);
  } catch (_) {}
}
