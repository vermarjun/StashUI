/**
 * Capture choreography for text-scroll-reveal
 * (source: text-scroll-reveal.tsx).
 *
 * Behaviour: a 200 vh container with a sticky panel. The component calculates
 * `scrollYProgress = (boundingRect.y / windowHeight) * -1` and maps each word
 * to a [i/n, (i+1)/n] opacity range. Words reveal progressively as the page
 * is scrolled through the sticky zone. Full reveal happens when the container
 * has been scrolled ~100 vh past the top of the viewport.
 * Strategy:
 *   1. Start at top (intro screen visible, prompt text shown).
 *   2. Scroll down gradually through the full 200 vh sticky zone.
 *   3. Pause at the bottom with all words revealed.
 *   4. Instantly return to top.
 */
export default async function capture(page, { W, H, wait }) {
  // Ensure we start from the very top.
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}

  try {
    await wait(400);
  } catch (_) {}

  // Scroll down through the intro screen (1 vh) and then through the full
  // 200 vh TextScrollReveal sticky zone — total ~300 vh of document scroll.
  // 36 steps × ~90 px/step at H=688 covers ~3240 px (≈ 4.7 vh-equivalents).
  // We use H-relative increments so the scroll covers the zone at any height.
  try {
    const steps = 36;
    const totalScroll = H * 3.2; // ~220 % of the 200 vh zone
    const stepSize = totalScroll / steps;
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, stepSize);
      await wait(90);
    }
  } catch (_) {}

  // Brief pause with all words at full opacity.
  try {
    await wait(800);
  } catch (_) {}

  // Instantly return to top for a clean loop seam.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  } catch (_) {}

  try {
    await wait(400);
  } catch (_) {}
}
