/**
 * Capture choreography for dither-image
 *
 * DitherImage is a CSS-only Bayer dither effect — no JS animation, fully
 * static. The demo shows two frames: a plain dithered image and a partial
 * reveal (dithered left / clean right). Strategy:
 *   1. Settle ~1500 ms for images to load and the dither CSS to render.
 *   2. Move mouse slowly across the first dithered frame (left panel) to
 *      let the pointer-tracked overlay reveal itself if any hover state exists.
 *   3. Drift across to the second panel (partial-reveal) with a slow sweep.
 *   4. Settle briefly at centre.
 *   5. Drift back left for the loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let images load and CSS dither render
  try { await wait(1500); } catch (_) {}

  // Move to the left dithered image (roughly W*0.3, H*0.45)
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.45), { steps: 12 });
    await wait(600);
  } catch (_) {}

  // Slow drift across the first image
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.35), { steps: 10 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.55), { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Drift over to the second (reveal) image
  try {
    await page.mouse.move(Math.round(W * 0.68), Math.round(H * 0.45), { steps: 18 });
    await wait(700);
  } catch (_) {}

  // Slow drift across the reveal panel — shows transition from dither to clean
  try {
    await page.mouse.move(Math.round(W * 0.6), Math.round(H * 0.4), { steps: 12 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.5), { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Return near start for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 14 });
    await wait(400);
  } catch (_) {}
}
