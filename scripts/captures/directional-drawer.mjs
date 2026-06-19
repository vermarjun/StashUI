/**
 * Choreography: directional-drawer
 * Left-side drawer: click "Open Drawer" button, dwell on open drawer, close via Escape.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Open Drawer" trigger button
  try {
    const trigger = page.getByRole('button', { name: /open drawer/i }).first();
    const box = await trigger.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W / 2, H / 2);
    }
    await wait(900); // slide-in animation
  } catch (_) {}

  // 3. Dwell on the open drawer — hover over nav links
  try {
    await page.mouse.move(W * 0.15, H * 0.35, { steps: 10 });
    await wait(500);
    await page.mouse.move(W * 0.15, H * 0.45, { steps: 8 });
    await wait(500);
    await page.mouse.move(W * 0.15, H * 0.55, { steps: 8 });
    await wait(600);
  } catch (_) {}

  // 4. Close via Escape key
  try {
    await page.keyboard.press('Escape');
    await wait(400);
  } catch (_) {}

  // 5. Return mouse to center
  try { await page.mouse.move(W / 2, H / 2, { steps: 10 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
