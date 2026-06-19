/**
 * Capture choreography for: mesh-gradient-background3
 * Behaviour: same R3F stack as mesh-gradient-background2 but without
 * postprocessing (no Noise pass) and with screen-space random noise baked into
 * the fragment shader. Blob color is '#ff0055' (hot pink). Camera fov=15,
 * Environment preset='studio'. Settle ~2.5 s + dwell ~3 s.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the R3F canvas to appear
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Three.js + studio env map settle (~2.5 s; no postprocessing saves some time)
  try {
    await wait(2500);
  } catch (_) {}

  // Park mouse at canvas centre — no OrbitControls interaction needed
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
  } catch (_) {}

  // Dwell phase 1: pink blob with fragment noise is animated via uTime
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell phase 2: give the noise texture another full cycle
  try {
    await wait(1500);
  } catch (_) {}
}
