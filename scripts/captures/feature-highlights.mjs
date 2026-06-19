/**
 * Capture choreography for feature-highlights (scroll:true).
 *
 * Component: full black section with py-32, min-h-screen heading block +
 * 3-column card grid (dark cards, pink icons, hover lifts to bg-neutral-900).
 * Strategy: settle, hover two of the three feature cards to show the pink
 * colour shift and "Learn more" highlight, then scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Ensure we start at the top and let entrance animations settle
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Scroll down a bit so the card grid is centred in the viewport
  try {
    await page.mouse.wheel(0, Math.round(H * 0.45));
    await wait(500);
  } catch (_) {}

  // Hover first card (left column)
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.55), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Hover second card (centre column)
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.55), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Hover third card (right column) briefly
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.55), { steps: 14 });
    await wait(450);
  } catch (_) {}

  // Park mouse in neutral position
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}
}
