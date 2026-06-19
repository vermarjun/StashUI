/**
 * Capture choreography for Beams-TS-TW
 *
 * Beams is a @react-three/fiber shader scene that renders animated light
 * beams. The effect runs continuously as a time-driven animation — no direct
 * pointer interaction needed. WebGL — may be blank headless.
 *
 * Strategy:
 *   1. Long settle 2 s for R3F Canvas + shader compilation.
 *   2. Dwell 3 s — the beam animation plays out; multiple beams sweep and
 *      cross the scene.
 *   3. Gentle mouse drift (in case the shader samples uMouse or similar
 *      uniforms) from left to right across the viewport.
 *   4. Brief pause, then return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // R3F + shader compilation
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Move to canvas centre so any pointer uniforms initialise
  try {
    await page.mouse.move(cx, cy, { steps: 6 });
  } catch (_) {}

  // Dwell — let beams animate
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle left→right drift
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.4), { steps: 8 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.6), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
