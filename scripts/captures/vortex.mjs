/**
 * Capture choreography for vortex.
 *
 * Effect: a simplex-noise particle system on a `<canvas>` — 700 particles
 * whose velocity is guided by a 3D noise field, creating swirling coloured
 * streaks (HSL hue 220±100, 100% saturation). Two glow passes via
 * `drawImage` with blur+brightness composite. Canvas is sized to
 * window.innerWidth × window.innerHeight on init.
 *
 * No pointer reactivity — purely time-driven.
 *
 * Strategy:
 *   1. Settle ~2.5 s for the particle system to fill in and the vortex
 *      swirl pattern to emerge from the initial random scatter.
 *   2. Dwell at centre ~3 s — the swirl is most visible at the convergence
 *      point (particles cluster toward centre of canvas).
 *   3. Cosmetic slow sweep left → right (no canvas effect, gives recorder
 *      a stable reference for centring).
 *   4. Return to centre — loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for canvas init + particle field to build density.
  try { await wait(2500); } catch (_) {}

  // Dwell at centre while the vortex swirl is prominent.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await wait(3000);
  } catch (_) {}

  // Cosmetic slow drift left → right.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.5), { steps: 8 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.5), { steps: 40 });
    await wait(500);
  } catch (_) {}

  // Return to centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
