/**
 * Choreography: dialog
 * Clicks "Open Dialog" button, dwells on the animated modal, then closes.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click "Open Dialog" trigger
  try {
    const btn = page.getByRole('button', { name: /open dialog/i }).first();
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W / 2, H / 2);
    }
    await wait(800); // animation in
  } catch (_) {}

  // 3. Hover the Confirm button
  try {
    const confirmBtn = page.getByRole('button', { name: /confirm/i }).first();
    const box = await confirmBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(600);
    }
  } catch (_) {}

  // 4. Dwell on open modal
  try { await wait(1400); } catch (_) {}

  // 5. Close with Escape
  try {
    await page.keyboard.press('Escape');
    await wait(600);
  } catch (_) {}

  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
