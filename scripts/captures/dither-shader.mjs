/**
 * Capture choreography for dither-shader.
 *
 * Effect: canvas-based ordered dithering of images (bayer + halftone panels).
 * The shader is purely CPU-drawn on mount — no pointer interaction. Strategy:
 *   1. Settle ~2000 ms so both images fully load and the dither pass completes.
 *   2. Move mouse slowly across the left panel (bayer grayscale) for visual
 *      interest even though it does not react.
 *   3. Drift across to the right panel (halftone duotone) with a slow sweep.
 *   4. Slow drift up-down on the right panel.
 *   5. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Two panels side by side: left panel ~W*0.3 centre, right ~W*0.7 centre
  const leftCx  = Math.round(W * 0.3);
  const rightCx = Math.round(W * 0.7);
  const cy      = Math.round(H * 0.48);

  // Extended settle — CPU dither render + image load
  try { await wait(2000); } catch (_) {}

  // Move to left panel
  try {
    await page.mouse.move(leftCx, cy, { steps: 12 });
    await wait(500);
  } catch (_) {}

  // Slow drift across left panel (top-left → bottom-right)
  try {
    await page.mouse.move(leftCx - 60, cy - 60, { steps: 10 });
    await wait(300);
    await page.mouse.move(leftCx + 60, cy + 50, { steps: 16 });
    await wait(400);
  } catch (_) {}

  // Drift to right panel
  try {
    await page.mouse.move(rightCx, cy, { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Slow vertical drift across right panel
  try {
    await page.mouse.move(rightCx - 40, cy - 70, { steps: 14 });
    await wait(350);
    await page.mouse.move(rightCx + 40, cy + 60, { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(Math.round(W / 2), cy, { steps: 14 });
    await wait(400);
  } catch (_) {}
}
