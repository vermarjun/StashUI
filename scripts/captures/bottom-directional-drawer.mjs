/**
 * Choreography: bottom-directional-drawer
 * Click the Edit button on the profile image to open a bottom-sliding drawer.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(1000); } catch (_) {}

  // 2. Click the Edit / open button
  try {
    const editBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
    const box = await editBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W * 0.38, H * 0.68);
    }
    await wait(900); // bottom drawer slides up
  } catch (_) {}

  // 3. Dwell inside the drawer (bottom portion)
  try {
    await page.mouse.move(W / 2, H * 0.72, { steps: 10 });
    await wait(600);
    await page.mouse.move(W * 0.4, H * 0.8, { steps: 8 });
    await wait(700);
  } catch (_) {}

  // 4. Close — click overlay at top
  try {
    await page.mouse.click(W / 2, H * 0.1);
    await wait(400);
  } catch (_) {}

  // 5. Park mouse
  try { await page.mouse.move(W / 2, H * 0.5, { steps: 10 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
