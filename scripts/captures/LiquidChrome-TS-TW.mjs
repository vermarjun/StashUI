/**
 * Capture choreography for LiquidChrome-TS-TW
 *
 * LiquidChrome renders an OGL WebGL shader of rippling chrome/liquid-metal
 * surface. interactive=true means mousemove events update uMouse, shifting the
 * phase of the sinusoidal distortion (frequencyX=3, frequencyY=2). The base
 * colour is near-black (0.1, 0.1, 0.1) with metallic specular highlights.
 *
 * Strategy:
 *   1. Settle ~2 s for OGL init + shader compile.
 *   2. Move cursor to canvas centre to seed uMouse (0.5, 0.5 normalised).
 *   3. Slow diagonal drift top-left → bottom-right to ripple the liquid surface
 *      — the highlight peaks shift and cross, revealing the chrome illusion.
 *   4. Dwell ~2 s at bottom-right.
 *   5. Arc back through centre to top-right for a second ripple pass.
 *   6. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL init + shader compile
  try {
    await wait(2000);
  } catch (_) {}

  // Seed at centre — uMouse = (0.5, 0.5)
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(300);
  } catch (_) {}

  // Drift top-left → bottom-right — ripple highlight sweeps diagonally
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.15), { steps: 30 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.85), { steps: 70 });
    await wait(2000);
  } catch (_) {}

  // Arc back via top-right — cross-frequency highlights appear
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.15), { steps: 60 });
    await wait(600);
    await page.mouse.move(cx, cy, { steps: 40 });
    await wait(400);
  } catch (_) {}
}
