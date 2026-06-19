/**
 * Capture choreography for team-vr (scroll:true).
 *
 * Component: bg-neutral-950 dark section with pink radial gradient, large
 * heading, and 3-column card grid. On hover each card: shows a pink-to-orange
 * gradient overlay with a quote, image goes colour + scales, name gains a
 * gradient text colour. Section is min-h-screen.
 * Strategy: settle, scroll to bring the card grid into view, hover two cards
 * to reveal the quote overlay and gradient name, then scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Wheel down to centre the card grid in the viewport
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55));
    await wait(600);
  } catch (_) {}

  // Hover first card (Michael Scott — left column)
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.45), { steps: 14 });
    await wait(650);
  } catch (_) {}

  // Hover second card (David Brent — centre column)
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.45), { steps: 14 });
    await wait(650);
  } catch (_) {}

  // Hover third card (Lara Croft — right column)
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.45), { steps: 14 });
    await wait(600);
  } catch (_) {}

  // Park mouse off cards so hover state clears before loop
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.12), { steps: 8 });
    await wait(350);
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}
}
