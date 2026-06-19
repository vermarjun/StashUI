/**
 * Choreography: right-motion-drawer
 * Click the Menu button fixed at top-right to open a right-sliding motion drawer.
 * Hover nav links inside, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the menu/open button (fixed at top-right)
  try {
    const menuBtn = page.getByRole('button').first();
    const box = await menuBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      // Fixed at top-right
      await page.mouse.click(W * 0.96, H * 0.06);
    }
    await wait(800); // spring animation
  } catch (_) {}

  // 3. Hover nav links inside the right drawer
  try {
    await page.mouse.move(W * 0.82, H * 0.25, { steps: 10 });
    await wait(400);
    await page.mouse.move(W * 0.82, H * 0.35, { steps: 8 });
    await wait(400);
    await page.mouse.move(W * 0.82, H * 0.45, { steps: 8 });
    await wait(600);
  } catch (_) {}

  // 4. Close — click overlay on the left side
  try {
    await page.mouse.click(W * 0.25, H * 0.5);
    await wait(500);
  } catch (_) {}

  // 5. Park mouse near center-top
  try { await page.mouse.move(W / 2, H * 0.15, { steps: 10 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
