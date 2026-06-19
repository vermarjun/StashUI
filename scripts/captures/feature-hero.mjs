/**
 * Capture choreography for feature-hero (scroll:true, min-h-screen).
 *
 * Component: full-page hero + 5-card feature grid (3 top + 2 bottom).
 * Cards have hover:bg-blue-100 on the icon circle. The whole section
 * is min-h-screen so taller than the viewport.
 * Strategy: settle animations, hover a couple of top-row feature cards,
 * then wheel down to reveal the bottom two cards and hover one, then
 * smooth-scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Start at top, let whileInView fade-in fire
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Hover first feature card icon (top row, left column ~W*0.18)
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.68), { steps: 12 });
    await wait(450);
  } catch (_) {}

  // Hover second feature card (top row, centre ~W*0.5)
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.68), { steps: 12 });
    await wait(450);
  } catch (_) {}

  // Wheel down to reveal bottom two feature cards
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55));
    await wait(550);
  } catch (_) {}

  // Hover one of the bottom cards
  try {
    await page.mouse.move(Math.round(W * 0.33), Math.round(H * 0.6), { steps: 10 });
    await wait(500);
  } catch (_) {}

  // Dwell at bottom
  try {
    await wait(400);
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
