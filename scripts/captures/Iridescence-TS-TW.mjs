/**
 * Capture choreography for Iridescence-TS-TW
 *
 * Iridescence is an OGL WebGL shader rendering an iridescent oil-slick surface.
 * mouseReact=true means cursor position shifts the interference pattern (smooth
 * colour ripple). The effect animates via iTime + uMouse uniforms.
 *
 * Strategy:
 *   1. Settle ~2 s for OGL renderer + shader compilation.
 *   2. Move cursor to canvas centre to seed uMouse at (0.5, 0.5).
 *   3. Slow diagonal drift top-left → bottom-right to shift the interference
 *      pattern and show the colour range.
 *   4. Dwell ~2.5 s at bottom-right corner.
 *   5. Return slowly to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL init + shader compile
  try {
    await wait(2000);
  } catch (_) {}

  // Seed at centre — initialises uMouse uniform
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(300);
  } catch (_) {}

  // Slow drift: centre → top-left corner
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.2), { steps: 50 });
    await wait(500);
  } catch (_) {}

  // Diagonal sweep to bottom-right — shows full colour spectrum
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.8), { steps: 80 });
    await wait(2500);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(cx, cy, { steps: 40 });
    await wait(400);
  } catch (_) {}
}
