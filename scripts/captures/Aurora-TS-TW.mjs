/**
 * Capture choreography for Aurora-TS-TW
 *
 * Aurora is a WebGL OGL shader (ogl Triangle, GLSL 300 es) that renders a
 * fluid, wave-like aurora borealis gradient across the full canvas.
 * The demo already wraps the component in a sized div (height 400px).
 * No cursor interaction — the animation is purely time-driven.
 *
 * Strategy:
 *   1. Settle ~2.5 s for WebGL init + first wave cycle to be visually rich.
 *   2. Dwell ~3 s so multiple wave peaks cross the viewport (slow speed=1.0).
 *   3. Park cursor at centre — no hover effect, keeps screenshot neutral.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for WebGL canvas to appear and first frames to render
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 6000 });
  } catch (e) {
    console.warn('Aurora: canvas not found', e.message);
  }

  // GL settle — aurora needs ~2s for noise patterns to look meaningful
  try {
    await wait(2500);
  } catch (_) {}

  // Dwell so the wave animation fills several GIF frames smoothly
  try {
    await wait(3000);
  } catch (_) {}

  // Park cursor off-edge — component has no mouse interaction
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
  } catch (e) {
    console.warn('Aurora: cursor park error', e.message);
  }
}
