/**
 * Capture choreography for: mesh-gradient-background2
 * Behaviour: same R3F stack as mesh-gradient-background but with a 4-octave
 * turbulence vertex shader and Environment preset='studio'. Default blob color
 * is '#ffd717' (gold). Camera fov=10 gives a tight crop on the blob. Needs
 * ~2.5 s settle for WebGL + studio env map, then dwell ~3 s for displacement.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the R3F canvas to appear
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Three.js + studio environment map + turbulence shader settle (~2.5 s)
  try {
    await wait(2500);
  } catch (_) {}

  // Centre mouse over the canvas to engage pointer tracking if any
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
  } catch (_) {}

  // Dwell phase 1: multi-octave turbulence produces complex organic movement
  try {
    await wait(1500);
  } catch (_) {}

  // Slight mouse drift to show the blob from a marginally different angle
  try {
    await page.mouse.move(W * 0.52, H * 0.48, { steps: 15 });
    await wait(700);
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 15 });
  } catch (_) {}

  // Dwell phase 2: final colour/displacement pass before capture
  try {
    await wait(1000);
  } catch (_) {}
}
