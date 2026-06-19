/**
 * Capture choreography for cropper
 *
 * The Cropper component (@origin-space/image-cropper) renders a draggable
 * crop box over an image with keyboard/pointer pan and scroll-to-zoom.
 * Strategy:
 *   1. Settle ~1s for image to load.
 *   2. Locate the cropper container via its data-slot attribute.
 *   3. Drag the crop box slightly right+down to show repositioning.
 *   4. Scroll inside the component to zoom in.
 *   5. Drag back toward original position for the loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the image load
  try { await wait(1000); } catch (_) {}

  // Locate the cropper element
  let box = null;
  try {
    const el = page.locator('[data-slot="cropper"]').first();
    box = await el.boundingBox();
  } catch (_) {}

  // Fallback: assume centred 576×320 cropper
  const cx = box ? box.x + box.width / 2 : W / 2;
  const cy = box ? box.y + box.height / 2 : H / 2 - 20;

  // Drag the crop area: press, move right+down, release
  try {
    await page.mouse.move(cx, cy, { steps: 6 });
    await page.mouse.down();
    await wait(80);
    await page.mouse.move(cx + 60, cy + 35, { steps: 14 });
    await wait(200);
    await page.mouse.up();
    await wait(400);
  } catch (_) {}

  // Scroll to zoom in a little
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await page.mouse.wheel(0, -150);
    await wait(500);
  } catch (_) {}

  // Drag back toward start position
  try {
    await page.mouse.move(cx + 60, cy + 35, { steps: 6 });
    await page.mouse.down();
    await wait(80);
    await page.mouse.move(cx, cy, { steps: 14 });
    await wait(200);
    await page.mouse.up();
    await wait(400);
  } catch (_) {}

  // Scroll back out
  try {
    await page.mouse.wheel(0, 150);
    await wait(400);
  } catch (_) {}
}
