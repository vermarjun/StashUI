/**
 * Capture choreography for background-boxes.
 *
 * Effect: a massive isometric grid of boxes (150 rows × 100 cols) rendered
 * with a skew/rotate transform at z-0. Each box uses `whileHover` to flash a
 * random pastel colour (blue/pink/green/yellow/red/purple/indigo). The grid
 * is clipped by the parent's overflow-hidden.
 *
 * Strategy:
 *   1. Brief settle (~500 ms) for the Framer Motion mount.
 *   2. Move mouse slowly from left-centre across to right-centre so boxes
 *      light up in a horizontal sweep — most visually legible path through
 *      the isometric grid.
 *   3. Sweep back left while drifting slightly downward.
 *   4. Diagonal pass toward upper-right.
 *   5. Return to centre — loop seam.
 *
 * Coordinate system: the grid's skew transform means the "visible" boxes
 * occupy roughly the centre 60% × 80% of the viewport.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle for mount.
  try { await wait(500); } catch (_) {}

  const cy = Math.round(H * 0.5);

  // Move to left side of grid.
  try {
    await page.mouse.move(Math.round(W * 0.2), cy, { steps: 8 });
    await wait(200);
  } catch (_) {}

  // Sweep left → right at mid-height (boxes light up in sequence).
  try {
    await page.mouse.move(Math.round(W * 0.8), cy, { steps: 50 });
    await wait(500);
  } catch (_) {}

  // Sweep back right → left, slightly lower.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.6), { steps: 45 });
    await wait(400);
  } catch (_) {}

  // Diagonal sweep upper-right — picks up boxes at a different grid angle.
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.35), { steps: 40 });
    await wait(400);
  } catch (_) {}

  // Return near centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
