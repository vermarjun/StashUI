/**
 * Capture choreography for DarkVeil-TS-TW
 *
 * DarkVeil is a WebGL OGL shader that renders a CPPN (Compositional Pattern-
 * Producing Network) neural-net image with hue-shift, scanlines, noise and
 * screen warp. The demo uses speed=0.5, hueShift=30, scanlineIntensity=0.2,
 * warpAmount=0.1. Animation is purely time-driven — no cursor interaction.
 *
 * Strategy:
 *   1. Settle ~2.5 s for the CPPN shader to compile (it is large) and the
 *      first time-varying colours to emerge.
 *   2. Dwell ~3.5 s — the hue rotates slowly; we want at least 2-3 different
 *      colour states visible across GIF frames.
 *   3. Park cursor at centre (no hover effect).
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 8000 });
  } catch (e) {
    console.warn('DarkVeil: canvas not found', e.message);
  }

  // CPPN fragment shader is enormous — give it extra compile time
  try {
    await wait(2500);
  } catch (_) {}

  // Dwell — let hue cycling and warp produce interesting frames
  try {
    await wait(3500);
  } catch (_) {}

  // No hover effect — park cursor at safe position
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
  } catch (e) {
    console.warn('DarkVeil: cursor park error', e.message);
  }
}
