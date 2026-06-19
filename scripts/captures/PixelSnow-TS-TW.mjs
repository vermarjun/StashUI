/**
 * Capture choreography for PixelSnow-TS-TW
 *
 * PixelSnow is a WebGL (Three.js) shader of falling pixel snowflakes. The
 * flakes fall downward continuously; there is no mouse interaction. The effect
 * runs as soon as the canvas mounts (ResizeObserver triggers renderer init).
 *
 * Strategy:
 *   1. Settle ~1.5 s for WebGL + shader uniform setup.
 *   2. Dwell ~3 s to show multiple layers of flakes cascading at different
 *      depths (depthFade gives parallax between near/far flakes).
 *   3. Cursor at centre — neutral, no interaction needed.
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL + snow shader settle
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell — show snow falling at multiple depth layers
  try {
    await wait(3000);
  } catch (_) {}

  // Neutral cursor
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
    await wait(300);
  } catch (_) {}
}
