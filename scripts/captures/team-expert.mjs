/**
 * Capture choreography for team-expert (scroll:true).
 *
 * Component: bg-neutral-50 section with a heading block, 4-column expert
 * card grid (orange hover reveal), and a second row of 4 white activity
 * cards. The section is taller than one viewport.
 * Strategy: settle at top, hover two expert cards to show the orange
 * bg flip and "READ MORE" reveal, wheel down to show activity cards and
 * hover one, then smooth-scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Scroll to bring the expert card grid into view
  try {
    await page.mouse.wheel(0, Math.round(H * 0.38));
    await wait(500);
  } catch (_) {}

  // Hover first expert card (leftmost column)
  try {
    await page.mouse.move(Math.round(W * 0.14), Math.round(H * 0.52), { steps: 14 });
    await wait(550);
  } catch (_) {}

  // Hover second expert card
  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.52), { steps: 14 });
    await wait(550);
  } catch (_) {}

  // Wheel down to reveal the activity cards row
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55));
    await wait(600);
  } catch (_) {}

  // Hover one activity card to show icon scale
  try {
    await page.mouse.move(Math.round(W * 0.26), Math.round(H * 0.5), { steps: 12 });
    await wait(500);
  } catch (_) {}

  // Park mouse
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.45), { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}
}
