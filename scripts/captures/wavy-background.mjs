/**
 * Capture choreography for wavy-background.
 *
 * Effect: a simplex-noise canvas animation that draws 5 coloured sinusoidal
 * waves (cyan, indigo, purple, fuchsia, sky) over a black fill. The canvas
 * size is set to window.innerWidth × window.innerHeight on init; blur:10px.
 *
 * No pointer reactivity — purely time-driven (nt increments each frame).
 *
 * Strategy:
 *   1. Settle ~2 s for the canvas to initialise and the first full wave
 *      cycle to be visible (noise progresses smoothly).
 *   2. Dwell for ~3 s at centre — waves undulate through their full motion.
 *   3. Brief mouse sweep across the container (cosmetic, no effect on canvas)
 *      to give the preview recorder a reference position for centring.
 *   4. Return to centre — loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for canvas initialisation and first wave render.
  try { await wait(2000); } catch (_) {}

  // Dwell at centre while waves animate.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await wait(3000);
  } catch (_) {}

  // Cosmetic slow drift left → right.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.5), { steps: 8 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.5), { steps: 35 });
    await wait(500);
  } catch (_) {}

  // Return to centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
    await wait(400);
  } catch (_) {}
}
