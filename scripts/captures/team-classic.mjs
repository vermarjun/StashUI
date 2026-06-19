/**
 * Capture choreography for team-classic (scroll:true).
 *
 * Component: bg-[#FFF0F5] section with centred heading and 4-column team
 * grid. Each card gains a coloured ring on hover and an emoji badge pops in.
 * The section is min-h-screen so taller than the viewport.
 * Strategy: settle, wheel down to bring the card grid into view, hover two
 * member cards to reveal the ring + emoji badge, then scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Scroll down to centre the card grid
  try {
    await page.mouse.wheel(0, Math.round(H * 0.4));
    await wait(550);
  } catch (_) {}

  // Hover first card (Candice Wu — red ring)
  try {
    await page.mouse.move(Math.round(W * 0.14), Math.round(H * 0.5), { steps: 14 });
    await wait(550);
  } catch (_) {}

  // Hover second card (Demi Wilkinson — blue ring)
  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.5), { steps: 14 });
    await wait(550);
  } catch (_) {}

  // Hover third card (Drew Cano — purple ring)
  try {
    await page.mouse.move(Math.round(W * 0.62), Math.round(H * 0.5), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Park mouse away from cards
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.15), { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}
}
