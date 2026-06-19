/**
 * Capture choreography for: components-backgrounds-hexagon
 * Behaviour: a dynamically computed hex-grid that fills the window. Each hex
 * cell responds to hover with a CSS transition (background/border highlight).
 * Sweeping the mouse across rows lights up cells sequentially — good for the
 * preview. Dwell after sweep for cells to fade back.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the hex grid compute its dimensions and render all cells
  try {
    await wait(600);
  } catch (_) {}

  // Initial park — top-left corner outside the hex area
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
    await wait(300);
  } catch (_) {}

  // Sweep horizontally across the middle row to light up a band of hexagons
  try {
    const steps = 40;
    const y = H * 0.5;
    for (let i = 0; i <= steps; i++) {
      try {
        await page.mouse.move(W * (i / steps), y);
      } catch (_) {}
      await wait(25);
    }
  } catch (_) {}

  // Second diagonal sweep from top-right toward centre
  try {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * (1 - t * 0.5), H * (0.1 + t * 0.4));
      } catch (_) {}
      await wait(30);
    }
  } catch (_) {}

  // Dwell: let highlighted cells fade back via CSS transition
  try {
    await wait(1200);
  } catch (_) {}
}
