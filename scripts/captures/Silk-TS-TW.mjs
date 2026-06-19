/**
 * Capture choreography for Silk-TS-TW
 *
 * Silk is a @react-three/fiber plane with a custom GLSL shader that renders
 * an animated silk-fabric pattern. The effect is purely time-driven (uTime
 * increments each frame via useFrame). No pointer interaction.
 *
 * Strategy:
 *   1. Settle 2.5 s for R3F Canvas mount, Three.js renderer init, and shader
 *      compilation.
 *   2. Move mouse to canvas centre (good practice; no shader effect here).
 *   3. Dwell 3 s — the sinusoidal pattern ripples and shifts, showing the
 *      full silk texture animation cycle.
 *   4. Brief pause before capture.
 */
export default async function capture(page, { W, H, wait }) {
  // R3F + shader compilation settle
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — silk wave pattern animates
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle drift to confirm animation is live (no shader interaction)
  try {
    await page.mouse.move(Math.round(W * 0.4), Math.round(H * 0.45), { steps: 8 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.6), Math.round(H * 0.55), { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
