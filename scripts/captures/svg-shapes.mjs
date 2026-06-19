/**
 * Capture choreography for svg-shapes.
 *
 * svg-shapes exports many SVG shapes (geometric, sacred geometry, Platonic
 * solid projections). The demo lays out five of them in a 3×2 grid. All are
 * static stroke-only SVGs — no animation. Strategy: settle, then slowly hover
 * each cell in reading order (top-left → top-right → bottom-left → bottom-
 * right) with a short pause at each shape to let the viewer identify them,
 * ending at the centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Grid layout: 3 cols × 2 rows, cells roughly at these centres.
  const cols = [Math.round(W * 0.17), Math.round(W * 0.5), Math.round(W * 0.83)];
  const rows = [Math.round(H * 0.28), Math.round(H * 0.72)];

  // Settle.
  try {
    await wait(600);
  } catch (_) {}

  // Visit each cell.
  for (const row of rows) {
    for (const col of cols) {
      try {
        await page.mouse.move(col, row, { steps: 18 });
        await wait(350);
      } catch (_) {}
    }
  }

  // End at centre.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 16 });
    await wait(900);
  } catch (_) {}
}
