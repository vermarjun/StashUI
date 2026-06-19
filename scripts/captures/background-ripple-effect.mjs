/**
 * Capture choreography for: background-ripple-effect
 * Behaviour: clicking a cell in the div grid triggers a ripple animation that
 * propagates outward from the clicked cell via CSS --delay per-cell.
 * Strategy: click 3 different spots spread across the grid, pausing between
 * each to let the ripple fully propagate, then return mouse near start.
 *
 * Grid layout: cols=27, rows=8, cellSize=56 → ~1512×448 px centred in demo.
 * The demo container is 960×600. Grid is centred horizontally, anchored top.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle: grid mounts and CSS vars resolve
  try {
    await wait(600);
  } catch (_) {}

  // Click 1: upper-left quadrant of the grid
  try {
    await page.mouse.move(W * 0.25, H * 0.25, { steps: 8 });
    await wait(200);
    await page.mouse.click(W * 0.25, H * 0.25);
    await wait(1400); // allow ripple to spread to far cells
  } catch (_) {}

  // Click 2: centre of the grid
  try {
    await page.mouse.move(W * 0.5, H * 0.4, { steps: 12 });
    await wait(200);
    await page.mouse.click(W * 0.5, H * 0.4);
    await wait(1400);
  } catch (_) {}

  // Click 3: lower-right quadrant
  try {
    await page.mouse.move(W * 0.75, H * 0.6, { steps: 12 });
    await wait(200);
    await page.mouse.click(W * 0.75, H * 0.6);
    await wait(1600); // slightly longer — cells at max distance have larger delay
  } catch (_) {}

  // Return mouse near start for loop seam
  try {
    await page.mouse.move(W * 0.25, H * 0.25, { steps: 15 });
    await wait(400);
  } catch (_) {}
}
