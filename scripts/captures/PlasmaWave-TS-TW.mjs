/**
 * Capture choreography for PlasmaWave-TS-TW
 *
 * PlasmaWave is an OGL ray-marcher that renders two undulating tube-like wave
 * ribbons coloured with user-supplied gradient stops. The animation is purely
 * time-driven — no pointer interaction. The effect looks best after a few
 * seconds when the ribbons have developed their full sinusoidal shape.
 *
 * Strategy:
 *   1. Settle 2.5 s for OGL WebGL1 renderer and shader compilation.
 *   2. Move mouse to centre (a no-op for the shader, but good practice for
 *      any overlay or focus handling in the gallery frame).
 *   3. Dwell 3 s — both coloured ribbons animate through several oscillation
 *      cycles, showcasing the colour blend and geometry.
 *   4. Brief dwell before capture.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL renderer + shader compilation
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — ribbons animate through wave cycles
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle drift to show the animation is live
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.45), { steps: 10 });
    await wait(500);
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.55), { steps: 10 });
    await wait(500);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
