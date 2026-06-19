/**
 * Capture choreography for ASCIIText-TS-TW
 *
 * ASCIIText renders a Three.js WebGL scene converted to ASCII art via a
 * custom AsciiFilter. The mesh takes ~2 s to initialise (font load + WebGL
 * context + IntersectionObserver settle). Moving the mouse rotates the 3D
 * plane and shifts the hue-rotate filter, making a visually rich capture.
 *
 * Note: in a headless environment the ASCII <pre> may remain blank because
 * WebGL is software-rendered and font metrics may differ. We still settle,
 * move the mouse, and dwell so any visible output is captured cleanly.
 *
 * Strategy:
 *   1. Settle ~2 s for WebGL init + font load.
 *   2. Sweep mouse diagonally to trigger hue-rotate + mesh rotation.
 *   3. Dwell ~3 s at an off-centre position so the animated state is visible.
 *   4. Return mouse near centre for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL + font init settle
  try {
    await wait(2000);
  } catch (_) {}

  // Move mouse to top-left quadrant to tilt the mesh and shift hue
  try {
    await page.mouse.move(W * 0.25, H * 0.3, { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Sweep across the canvas to show the mouse-tracking rotation
  try {
    await page.mouse.move(W * 0.75, H * 0.65, { steps: 40 });
    await wait(500);
  } catch (_) {}

  // Dwell at an off-centre position so the settled animation is visible
  try {
    await page.mouse.move(W * 0.6, H * 0.4, { steps: 15 });
    await wait(3000);
  } catch (_) {}

  // Return near centre for a tidy loop seam
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
    await wait(400);
  } catch (_) {}
}
