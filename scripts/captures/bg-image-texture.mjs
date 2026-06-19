/**
 * Capture choreography for bg-image-texture (BackgroundImageTexture).
 *
 * BackgroundImageTexture tiles a repeating PNG texture (`/textures/*.png`)
 * over the background at a configurable opacity. The component is static —
 * no animation. Strategy: settle briefly (texture image fetch from /public),
 * then zoom-pan the mouse to different quadrants so the repeating tile pattern
 * is visible at multiple positions, ending with a centred dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle — allow texture PNG to load from /public.
  try {
    await wait(1000);
  } catch (_) {}

  // Scan upper-left quadrant.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Move to upper-right.
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.25), { steps: 22 });
    await wait(400);
  } catch (_) {}

  // Move to lower-right.
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.75), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Return to centre and dwell on the heading text.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 18 });
    await wait(1500);
  } catch (_) {}
}
