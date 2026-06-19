/**
 * Capture choreography for feature-bento (scroll:true).
 *
 * Component: asymmetric bento grid on bg-slate-50 — hero card (2×2),
 * two stat cards, a feature card, CTA card, and two more stat cards.
 * The grid is min-h-screen so taller than the viewport.
 * Strategy: settle, hover the hero card to show the parallax image scale,
 * hover the dark CTA card (arrow rotate), wheel down to reveal the lower
 * row, hover a stats card, then scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Hover the large hero card (top-left 2×2 block)
  try {
    await page.mouse.move(Math.round(W * 0.28), Math.round(H * 0.42), { steps: 14 });
    await wait(550);
  } catch (_) {}

  // Hover the dark CTA card (top-right area) — shows arrow rotation
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.55), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Wheel down to reveal the lower stat row
  try {
    await page.mouse.wheel(0, Math.round(H * 0.5));
    await wait(600);
  } catch (_) {}

  // Hover the purple-accented stats card (active community)
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.55), { steps: 12 });
    await wait(500);
  } catch (_) {}

  // Park mouse
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}
}
