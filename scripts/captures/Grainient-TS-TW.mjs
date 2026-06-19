/**
 * Capture choreography for Grainient-TS-TW
 *
 * Grainient is an OGL WebGL shader rendering an animated grainy gradient with
 * warp distortion. Three vivid color stops (pink, violet, lavender) blend
 * smoothly via time-driven noise. No pointer interaction — purely time-driven.
 *
 * Strategy:
 *   1. Settle ~2 s for OGL + WebGL 300es shader compilation.
 *   2. Move cursor to centre (neutral for any residual pointer code).
 *   3. Dwell ~3.5 s — warp cycles and grain texture animate visibly.
 *   4. Cursor stays at centre for clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL WebGL 300es shader settle
  try {
    await wait(2000);
  } catch (_) {}

  // Seed cursor at centre
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
  } catch (_) {}

  // Dwell — gradient warp and grain animate
  try {
    await wait(3500);
  } catch (_) {}
}
