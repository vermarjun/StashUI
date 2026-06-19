/**
 * Capture choreography for pixel-image
 *
 * PixelImage reveals an image via a pixelated fade-in animation that runs
 * automatically on mount (isVisible triggers immediately, color reveals after
 * colorRevealDelay ~1200 ms). The whole sequence is ~2.3s. Strategy:
 *   1. Settle ~500 ms so the page paints.
 *   2. Let the pixel fade-in + grayscale→color transition play (~2 s).
 *   3. Hover the image to confirm it is interactive and hold.
 *   4. Move mouse away and back to loop the reveal from the top by reloading
 *      (the animation triggers on mount so we watch it once per load).
 *   5. End near centre so the loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Brief settle for paint
  try { await wait(500); } catch (_) {}

  // Watch the full pixel reveal + grayscale-to-color sequence
  try { await wait(2000); } catch (_) {}

  // Hover the image — it sits roughly centred in the viewport
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(800);
  } catch (_) {}

  // Drift mouse slowly across the image surface
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx - 80, cy - 40, { steps: 14 });
    await wait(400);
    await page.mouse.move(cx + 80, cy + 30, { steps: 16 });
    await wait(400);
  } catch (_) {}

  // Return to centre for a clean loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
