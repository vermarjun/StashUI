/**
 * Capture choreography for productcard5
 *
 * Card features: product image (Air Jordan 1 Mid SE), heart-toggle, size
 * selector buttons (7 / 7.5 / 8 / 8.5), price, and "Add to cart" with
 * shopping-cart icon. whileHover scale on size chips.
 *
 * Strategy:
 *   1. Settle on card.
 *   2. Hover image area.
 *   3. Click heart to toggle fill animation.
 *   4. Hover and click a size chip (8) — scale spring + selected state.
 *   5. Hover "Add to cart" button.
 *   6. Move away then return to card centre.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Settle
  try {
    await wait(400);
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Hover image area
  try {
    await page.mouse.move(cx, cy - 90, { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Click heart button (top-right of image)
  try {
    const heart = page.locator('button').filter({ has: page.locator('svg') }).first();
    const box = await heart.boundingBox();
    if (box) {
      const hx = box.x + box.width / 2;
      const hy = box.y + box.height / 2;
      await page.mouse.move(hx, hy, { steps: 16 });
      await wait(200);
      await page.mouse.click(hx, hy);
      await wait(500);
    }
  } catch (_) {}

  // Hover size chip "8" — whileHover scale
  try {
    const sizeChip = page.locator('span').filter({ hasText: /^8$/ });
    const box = await sizeChip.boundingBox();
    if (box) {
      const sx = box.x + box.width / 2;
      const sy = box.y + box.height / 2;
      await page.mouse.move(sx, sy, { steps: 18 });
      await wait(300);
      await page.mouse.click(sx, sy);
      await wait(400);
    }
  } catch (_) {}

  // Hover size chip "7.5" as well
  try {
    const sizeChip = page.locator('span').filter({ hasText: /^7\.5$/ });
    const box = await sizeChip.boundingBox();
    if (box) {
      const sx = box.x + box.width / 2;
      const sy = box.y + box.height / 2;
      await page.mouse.move(sx, sy, { steps: 14 });
      await wait(300);
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
    await page.mouse.move(cx + 210, cy, { steps: 14 });
    await wait(300);
  } catch (_) {}

  // Return to card centre — resting frame
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(400);
  } catch (_) {}
}
