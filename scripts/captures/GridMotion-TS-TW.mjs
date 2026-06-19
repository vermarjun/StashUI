/**
 * Capture choreography for GridMotion-TS-TW
 *
 * GridMotion is a GSAP-driven grid of tiled items that slides alternate rows
 * left/right based on mouse X position (via gsap.ticker). Moving the cursor
 * slowly across the full width shows all rows drifting in opposite directions,
 * revealing the parallax depth of the grid.
 *
 * Strategy:
 *   1. Brief mount settle (GSAP ticker init, DOM layout).
 *   2. Start cursor at left edge, sweep slowly right so rows drift apart.
 *   3. Reverse sweep back left — rows cross and re-converge.
 *   4. Settle at centre so rows are balanced, loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow GSAP ticker and grid layout to initialise
  try {
    await wait(400);
  } catch (_) {}

  // Position cursor at left edge
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.5), { steps: 1 });
    await wait(200);
  } catch (_) {}

  // Slow sweep left → right: rows drift in opposite directions
  try {
    await page.mouse.move(Math.round(W * 0.95), Math.round(H * 0.5), { steps: 80 });
    await wait(600);
  } catch (_) {}

  // Dwell at right edge so the offset is clearly visible
  try {
    await wait(500);
  } catch (_) {}

  // Reverse sweep right → left
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.5), { steps: 80 });
    await wait(500);
  } catch (_) {}

  // Return to centre so rows converge symmetrically for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 30 });
    await wait(600);
  } catch (_) {}
}
