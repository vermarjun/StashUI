/**
 * Capture choreography for texture-overlay (TextureOverlay).
 *
 * TextureOverlay is a pure CSS background-pattern overlay (dots, grid,
 * crosshatch, diagonal, halftone, paperGrain). The demo shows six variants
 * in a 3×2 grid. All are static — no animation. Strategy: settle briefly,
 * then visit each cell in reading order with a short dwell at each, allowing
 * the viewer to see each distinct pattern before ending at the centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Grid layout: 3 cols × 2 rows.
  const cols = [Math.round(W * 0.17), Math.round(W * 0.5), Math.round(W * 0.83)];
  const rows = [Math.round(H * 0.27), Math.round(H * 0.73)];

  // Settle.
  try {
    await wait(500);
  } catch (_) {}

  // Visit each cell left-to-right, top row then bottom row.
  for (const row of rows) {
    for (const col of cols) {
      try {
        await page.mouse.move(col, row, { steps: 16 });
        await wait(350);
      } catch (_) {}
    }
  }

  // End at centre.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 14 });
    await wait(800);
  } catch (_) {}
}
