/**
 * Choreography: nested-vaul-drawer
 * Click "Open Drawer", dwell, then click "Open Second Drawer" to show nesting.
 * Close via backdrop tap.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click "Open Drawer" trigger
  try {
    const openBtn = page.getByRole('button', { name: /open drawer/i }).first();
    const box = await openBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W / 2, H * 0.3);
    }
    await wait(900); // bottom sheet slides up
  } catch (_) {}

  // 3. Dwell on the first drawer content
  try {
    await page.mouse.move(W / 2, H * 0.55, { steps: 10 });
    await wait(800);
  } catch (_) {}

  // 4. Click "Open Second Drawer" for nested demo
  try {
    const nestedBtn = page.getByRole('button', { name: /open second drawer/i }).first();
    const box = await nestedBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      // Try clicking in the drawer body area where the button is
      await page.mouse.click(W / 2, H * 0.75);
    }
    await wait(900); // nested drawer slides up
  } catch (_) {}

  // 5. Dwell on nested drawer
  try {
    await page.mouse.move(W / 2, H * 0.6, { steps: 10 });
    await wait(1000);
  } catch (_) {}

  // 6. Close via Escape (closes nested then outer)
  try {
    await page.keyboard.press('Escape');
    await wait(500);
    await page.keyboard.press('Escape');
    await wait(400);
  } catch (_) {}

  // 7. Park mouse
  try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
