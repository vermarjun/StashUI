/**
 * Capture choreography for team-clippath (scroll:false).
 *
 * Component: 4 member cards laid out horizontally in a fixed 420px-tall
 * strip. Each card starts at 200px wide with a circle clip-path. On hover
 * the hovered card expands to 600px and others shrink to 150px with a blur;
 * name, role, and tags fade up from below.
 * Strategy: settle, hover each card in sequence with a dwell to show the
 * clip-path expansion and text reveal, then park the mouse off the strip.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let initial clip-path and layout settle
  try {
    await wait(700);
  } catch (_) {}

  // Cards are horizontally centred; strip starts around H*0.28 (below heading)
  const stripY = Math.round(H * 0.58);

  // Card approximate x-centres when none are hovered (each ~200px, 4 cards in ~900px)
  // Centred in W=1200: offset ≈ (1200 - 4*200 - 3*24) / 2 ≈ 164px from edge
  const cardCentres = [
    Math.round(W * 0.16),
    Math.round(W * 0.35),
    Math.round(W * 0.56),
    Math.round(W * 0.76),
  ];

  // Hover first card (Adrian Paul)
  try {
    await page.mouse.move(cardCentres[0], stripY, { steps: 14 });
    await wait(700);
  } catch (_) {}

  // Hover second card (Flualy Cual) — first card collapses, second expands
  try {
    await page.mouse.move(cardCentres[1], stripY, { steps: 14 });
    await wait(700);
  } catch (_) {}

  // Hover third card
  try {
    await page.mouse.move(cardCentres[2], stripY, { steps: 14 });
    await wait(700);
  } catch (_) {}

  // Hover fourth card (John Doe)
  try {
    await page.mouse.move(cardCentres[3], stripY, { steps: 14 });
    await wait(650);
  } catch (_) {}

  // Park mouse above the strip so no card is hovered at the end of the loop
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.2), { steps: 10 });
    await wait(400);
  } catch (_) {}
}
