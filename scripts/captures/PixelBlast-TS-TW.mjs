/**
 * Capture choreography for PixelBlast-TS-TW
 *
 * PixelBlast is a WebGL/postprocessing shader that renders an animated pixel
 * pattern (default variant: 'square') that reacts to touch/pointer events via
 * a TouchTexture. Moving the cursor leaves a ripple trail in the pixel field.
 *
 * Strategy:
 *   1. Longer settle ~2.5 s for WebGL context + EffectComposer init.
 *   2. Slow diagonal sweep from top-left to bottom-right — drags the touch
 *      ripple across the full pixel field.
 *   3. Reverse arc bottom-right → top-left to show the trail fading.
 *   4. Circular stroke at centre to show the pixel burst interaction.
 *   5. Dwell ~1 s, return near centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // WebGL + EffectComposer settle
  try {
    await wait(2500);
  } catch (_) {}

  // Sweep top-left → bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.1), { steps: 1 });
    await wait(100);
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.9), { steps: 70 });
    await wait(400);
  } catch (_) {}

  // Reverse bottom-right → top-left
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.9), { steps: 60 });
    await wait(300);
  } catch (_) {}

  // Circular stroke at centre
  try {
    const r = Math.round(Math.min(W, H) * 0.12);
    for (let i = 0; i <= 24; i++) {
      const angle = (i / 24) * 2 * Math.PI;
      const px = Math.round(cx + r * Math.cos(angle));
      const py = Math.round(cy + r * Math.sin(angle));
      await page.mouse.move(px, py, { steps: 2 });
      await wait(40);
    }
  } catch (_) {}

  // Dwell
  try {
    await wait(1000);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(500);
  } catch (_) {}
}
