/**
 * Capture choreography for stacking-card (scroll:true).
 *
 * Component: ReactLenis + framer-motion stacking cards. Each card
 * takes a full screen height; scrolling pins and scales them down.
 * Strategy: wheel down slowly through all 5 cards so each one stacks
 * visibly, dwell at the bottom, then smooth-scroll back to the top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Start at the very top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(600);
  } catch (_) {}

  // Scroll through intro section to reach the card stack
  try {
    await page.mouse.wheel(0, Math.round(H * 0.6));
    await wait(500);
  } catch (_) {}

  // Scroll through each of the 5 stacking cards (~1 screen each)
  const cardCount = 5;
  for (let i = 0; i < cardCount; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.85));
      await wait(520);
    } catch (_) {}
  }

  // Dwell at the bottom to show the fully stacked state
  try {
    await wait(700);
  } catch (_) {}

  // Smooth-scroll back to top so the loop seam is clean
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}

  try {
    await wait(300);
  } catch (_) {}
}
