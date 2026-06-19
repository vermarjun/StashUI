/**
 * Capture choreography for css-card-stacking (scroll:true).
 *
 * Component: CSS sticky-based card stacking. Each card is `sticky top-0
 * h-screen` inside a flex column, so scrolling reveals and pins them
 * over each other. 4 cards on the left, a sticky text panel on the right.
 * Strategy: wheel down slowly through all 4 cards, dwell at bottom,
 * smooth-scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Ensure we start at the very top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(600);
  } catch (_) {}

  // Scroll through intro hero section
  try {
    await page.mouse.wheel(0, Math.round(H * 0.7));
    await wait(480);
  } catch (_) {}

  // Scroll through each sticky card (4 cards, ~1 screen each)
  const cardCount = 4;
  for (let i = 0; i < cardCount; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.9));
      await wait(500);
    } catch (_) {}
  }

  // Dwell showing all cards pinned
  try {
    await wait(700);
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}

  try {
    await wait(300);
  } catch (_) {}
}
