/**
 * Choreography: inspira-interactive-grid-pattern  (file: interactive-grid-pattern.tsx)
 * SVG grid — cells highlight on hover. Sweep mouse across the grid in a
 * slow S-curve so multiple cells light up for the capture frame.
 */
export default async function choreograph({ page, W, H }) {
  // Brief settle so SVG renders
  await new Promise((r) => setTimeout(r, 500));

  // S-curve sweep: top-left → top-right → mid-left → mid-right → bottom-right
  const moves = [
    [W * 0.1, H * 0.2],
    [W * 0.9, H * 0.2],
    [W * 0.1, H * 0.5],
    [W * 0.9, H * 0.5],
    [W * 0.1, H * 0.8],
    [W * 0.9, H * 0.8],
  ];

  try {
    // Start at first position
    await page.mouse.move(moves[0][0], moves[0][1]);
    await new Promise((r) => setTimeout(r, 200));

    for (const [x, y] of moves.slice(1)) {
      await page.mouse.move(x, y, { steps: 25 });
      await new Promise((r) => setTimeout(r, 300));
    }
  } catch (e) {
    console.warn("grid sweep failed", e.message);
  }

  // Park mouse in the upper-centre area so a cluster of cells stays lit
  try {
    await page.mouse.move(W * 0.5, H * 0.35, { steps: 15 });
  } catch (e) {
    console.warn("park move failed", e.message);
  }

  // Dwell with cells lit
  await new Promise((r) => setTimeout(r, 3000));
}
