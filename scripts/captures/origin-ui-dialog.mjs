/**
 * Choreography: origin-ui-dialog
 * Opens a Radix Dialog, dwells on the content, then closes via Escape.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click "Open Dialog" trigger button
  try {
    const btn = page.getByRole("button", { name: /open dialog/i }).first();
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W / 2, H / 2);
    }
    await wait(800);
  } catch (_) {}

  // 3. Dwell on the open dialog
  try { await wait(1500); } catch (_) {}

  // 4. Hover the Confirm button
  try {
    const confirmBtn = page.getByRole("button", { name: /confirm/i }).first();
    const box = await confirmBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(600);
    }
  } catch (_) {}

  // 5. Close via Escape
  try {
    await page.keyboard.press("Escape");
    await wait(500);
  } catch (_) {}

  // 6. Settle
  try { await wait(300); } catch (_) {}
}
