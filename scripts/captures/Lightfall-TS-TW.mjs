/**
 * Capture choreography for Lightfall-TS-TW
 *
 * Lightfall is an OGL WebGL shader that renders animated falling light streaks
 * (aurora-style rain) over a glowing background. The demo uses bg-black with
 * explicit color/speed/density props. No mouse interaction in the demo — pure
 * time-driven animation.
 *
 * Strategy:
 *   1. Settle ~2.5 s for OGL renderer + fragment shader compilation.
 *   2. Move cursor to canvas centre so any residual pointer uniforms initialise.
 *   3. Dwell ~3 s — streaks fall and twinkle across the scene.
 *   4. Return cursor to centre for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL renderer + shader compile
  try {
    await wait(2500);
  } catch (_) {}

  // Seed cursor at centre
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
  } catch (_) {}

  // Dwell — let streaks fall, twinkle, and glow animate
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle drift so any background-glow uniform responds
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.45), { steps: 20 });
    await wait(500);
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(300);
  } catch (_) {}
}
