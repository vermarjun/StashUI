/**
 * Capture choreography for team-synth (scroll:true).
 *
 * Component: bg-neutral-950 dark section with a large italic heading, radial
 * purple gradient, and 3-column card grid. On hover: card lifts (-translate-y-4
 * rotate-1), image goes from greyscale to colour, cyan corner brackets appear,
 * and a cyan glow glows behind. The section is min-h-screen.
 * Strategy: settle, scroll to bring the card grid into view, hover two cards
 * in sequence to show the lift + colour reveal, then scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Wheel down past the large heading to put the cards in the centre of viewport
  try {
    await page.mouse.wheel(0, Math.round(H * 0.5));
    await wait(600);
  } catch (_) {}

  // Hover first card (Amélie Laurent — leftmost column)
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.52), { steps: 14 });
    await wait(600);
  } catch (_) {}

  // Hover second card (Nikolas Gibbons — centre column)
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.52), { steps: 14 });
    await wait(600);
  } catch (_) {}

  // Hover third card (Sienna Hewitt — right column)
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.52), { steps: 14 });
    await wait(550);
  } catch (_) {}

  // Park mouse off cards
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
