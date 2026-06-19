/**
 * Choreography: text-reveal
 * Behavior: words fade in word-by-word as the user scrolls down (scroll-driven,
 * 200 vh container with sticky panel). align=top, scroll=true.
 * Strategy: scroll down through the full 200 vh sticky zone, then return to top.
 */
export default async function choreograph({ page, W, H }) {
  // Start from the very top
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (e) {
    // non-fatal
  }

  try {
    await page.waitForTimeout(400);
  } catch (e) {
    // non-fatal
  }

  // Scroll down gradually through the sticky zone (~200 vh worth of content)
  // Use small increments so the per-word opacity transitions are visible
  try {
    const steps = 30;
    const totalScroll = H * 2; // 200 vh
    const stepSize = totalScroll / steps;
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, stepSize);
      await page.waitForTimeout(80);
    }
  } catch (e) {
    // non-fatal
  }

  // Brief pause at the bottom to show all words fully revealed
  try {
    await page.waitForTimeout(600);
  } catch (e) {
    // non-fatal
  }

  // Return to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  } catch (e) {
    // non-fatal
  }

  try {
    await page.waitForTimeout(300);
  } catch (e) {
    // non-fatal
  }
}
