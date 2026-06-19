/**
 * Capture choreography for: mesh-shadergradient
 * Behaviour: @shadergradient/react ShaderGradientCanvas — WebGL sphere gradient
 * animating with uSpeed 0.3 and grain. Needs ~2.5 s to initialise the WebGL
 * context and ramp to full colour, then dwell ~3 s so the sphere has rotated
 * visibly. No pointer interaction (pointerEvents='none').
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for canvas to mount
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // WebGL shader settle: context init + first geometry frames (~2.5 s)
  try {
    await wait(2500);
  } catch (_) {}

  // Park mouse off the canvas (pointer-events are none anyway)
  try {
    await page.mouse.move(W * 0.1, H * 0.9, { steps: 5 });
  } catch (_) {}

  // Dwell phase 1: sphere colour animation is now fully running
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell phase 2: let a full colour shift cycle through (uSpeed 0.3 is slow)
  try {
    await wait(1500);
  } catch (_) {}
}
