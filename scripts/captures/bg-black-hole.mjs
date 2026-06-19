/**
 * Choreography: bg-black-hole
 * Behavior: Canvas-based black-hole effect — concentric elliptic discs +
 *           radial spiral lines + upward particle stream. Fully automatic.
 *           Strategy: wait ~2.5 s for the canvas to initialise and the
 *           off-screen lines canvas to render, then dwell ~3 s to capture
 *           the particle stream flowing into the singularity.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for canvas mount + off-screen lines canvas to be drawn via 2D context.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  // Settle — the init() call sets up discs, lines (off-screen canvas draw),
  // and particles; tick() starts the RAF loop.
  try { await wait(2500); } catch (_) {}

  // Park cursor away from centre to avoid accidental hover states.
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.2), { steps: 10 });
  } catch (_) {}

  // Dwell: particle stream + rotating discs — the main visual payoff.
  try { await wait(3000); } catch (_) {}

  // Return cursor to a neutral position for loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
  } catch (_) {}

  try { await wait(500); } catch (_) {}
}
