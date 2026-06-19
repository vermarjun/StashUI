/**
 * Capture choreography for FaultyTerminal-TS-TW
 *
 * FaultyTerminal renders an OGL fullscreen shader (ASCII/digit terminal with
 * glitch, scanlines, CRT curvature). `mouseReact={true}` is passed in the
 * demo — the shader samples a uMouse uniform that drives glitch intensity at
 * the pointer position. WebGL via OGL — may be blank headless.
 *
 * Strategy:
 *   1. Settle 2 s for OGL Renderer + shader compile.
 *   2. Dwell 1.5 s — let the glitch/flicker cycle play.
 *   3. Move mouse slowly from left to right — the mouse-reactive glitch band
 *      follows the pointer horizontally.
 *   4. Move from top to bottom at mid-x — vertical sweep.
 *   5. Dwell 1 s watching the idle glitch continue.
 *   6. Return mouse to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL Renderer + shader compile
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Dwell — idle glitch + scanlines visible
  try {
    await wait(1500);
  } catch (_) {}

  // Horizontal sweep — left → right
  try {
    await page.mouse.move(Math.round(W * 0.05), cy, { steps: 4 });
    await page.mouse.move(Math.round(W * 0.95), cy, { steps: 24 });
  } catch (_) {}

  try {
    await wait(500);
  } catch (_) {}

  // Vertical sweep — top → bottom at mid-x
  try {
    await page.mouse.move(cx, Math.round(H * 0.05), { steps: 4 });
    await page.mouse.move(cx, Math.round(H * 0.95), { steps: 24 });
  } catch (_) {}

  // Idle glitch dwell
  try {
    await wait(1000);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
