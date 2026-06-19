// hexagon-pattern: static SVG honeycomb with highlighted hexagons.
// No animation — settle for SVG paint then dwell.
export default async function capture(page, { W, H, wait }) {
  // Settle for SVG pattern + highlight render
  try { await wait(400); } catch (_) {}

  // Park mouse at centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell to show full honeycomb
  try { await wait(3600); } catch (_) {}

  // Slight drift and return
  try {
    await page.mouse.move(Math.round(W * 0.53), Math.round(H * 0.47), { steps: 10 });
  } catch (_) {}

  try { await wait(600); } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
