/**
 * Capture choreography for productcard4
 *
 * Card features: product image (Nike Air Max), heart-toggle button in the
 * image area, and an "Add to cart" button. Hover over the image area to show
 * the cursor affordance; click the heart to toggle fill animation; hover the
 * cart button; then reset.
 *
 * Strategy:
 *   1. Settle on card.
 *   2. Hover image area — zoom effect if any.
 *   3. Click the heart button — spring-scale animation fires.
 *   4. Hover "Add to cart" button — gradient bg reveals.
 *   5. Move away briefly, then return to card centre.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Settle on card
  try {
    await wait(400);
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Move to image area (upper half of card)
  try {
    await page.mouse.move(cx, cy - 80, { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Click heart button (top-right of image)
  try {
    const heart = page.locator('button').filter({ has: page.locator('svg') }).first();
    const box = await heart.boundingBox();
    if (box) {
      const hx = box.x + box.width / 2;
      const hy = box.y + box.height / 2;
      await page.mouse.move(hx, hy, { steps: 18 });
      await wait(200);
      await page.mouse.click(hx, hy);
      await wait(500);
    }
  } catch (_) {}

  // Hover "Add to cart" button
  try {
    const cartBtn = page.getByRole('button', { name: /add to cart/i });
    const box = await cartBtn.boundingBox();
    if (box) {
      const bx = box.x + box.width / 2;
      const by = box.y + box.height / 2;
      await page.mouse.move(bx, by, { steps: 20 });
      await wait(600);
    }
  } catch (_) {}

  // Move away briefly
  try {
    await page.mouse.move(cx + 200, cy, { steps: 14 });
    await wait(300);
  } catch (_) {}

  // Return to card image centre — resting frame
  try {
    await page.mouse.move(cx, cy - 40, { steps: 16 });
    await wait(400);
  } catch (_) {}
}
