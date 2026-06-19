/**
 * Capture choreography for FloatingLines-TS-TW
 *
 * FloatingLines is a Three.js (ShaderMaterial) full-screen effect that renders
 * multiple layers of animated sine-wave lines (top, middle, bottom bands).
 * interactive=true: the cursor bends lines toward/away from the pointer via a
 * Gaussian-falloff uniform (bendInfluence ramps with mouse entry). parallax=true
 * shifts the UV origin based on cursor distance from centre.
 *
 * Strategy:
 *   1. Settle 2.5 s for Three.js renderer + shader compilation.
 *   2. Move pointer to canvas centre — triggers pointermove, ramps
 *      bendInfluence to 1.0, sets parallax offset to (0,0).
 *   3. Dwell 3 s — all three line bands animate and the subtle background
 *      colour establishes.
 *   4. Slow upward sweep from centre to top-centre — bends the upper lines
 *      visibly toward the cursor; parallax shifts the canvas upward.
 *   5. Slow sweep to bottom-right — reverses parallax; lower-band bend.
 *   6. Wide horizontal sweep across the middle — showcases the middle-band
 *      bend across the full width.
 *   7. Return to centre and let bendInfluence decay.
 */
export default async function capture(page, { W, H, wait }) {
  // Three.js renderer + shader compilation
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Enter canvas at centre — ramps bendInfluence
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — line bands animate
  try {
    await wait(3000);
  } catch (_) {}

  // Upward sweep — bend upper lines
  try {
    await page.mouse.move(cx, Math.round(H * 0.15), { steps: 20 });
    await wait(500);
  } catch (_) {}

  // Sweep to bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.8), { steps: 24 });
    await wait(500);
  } catch (_) {}

  // Wide horizontal sweep across middle
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.5), { steps: 8 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.5), { steps: 28 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(600);
  } catch (_) {}
}
