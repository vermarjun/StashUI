/**
 * Choreography: motion-drawer
 * Click the Menu (hamburger) button fixed at top-left to open the left motion drawer.
 * Hover nav items, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the hamburger/menu button (fixed top-left)
  try {
    const menuBtn = page.getByRole('button').first();
    const box = await menuBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      // Fixed at top-left corner
      await page.mouse.click(W * 0.04, H * 0.06);
    }
    await wait(800); // spring animation settles
  } catch (_) {}

  // 3. Hover nav items inside the drawer
  try {
    await page.mouse.move(W * 0.14, H * 0.25, { steps: 10 });
    await wait(400);
    await page.mouse.move(W * 0.14, H * 0.35, { steps: 8 });
    await wait(400);
    await page.mouse.move(W * 0.14, H * 0.45, { steps: 8 });
    await wait(400);
    await page.mouse.move(W * 0.14, H * 0.55, { steps: 8 });
    await wait(500);
  } catch (_) {}

  // 4. Close — click overlay on the right side
  try {
    await page.mouse.click(W * 0.75, H * 0.5);
    await wait(500);
  } catch (_) {}

  // 5. Park mouse near the open button area
  try { await page.mouse.move(W * 0.04, H * 0.06, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
