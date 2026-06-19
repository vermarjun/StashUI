/**
 * Choreography: alert-dialog
 * Clicks "Delete account" to open the AlertDialog, dwells on it,
 * then closes via Cancel / Escape.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click "Delete account" trigger
  try {
    const btn = page.getByRole("button", { name: /delete account/i }).first();
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

  // 3. Dwell on the alert dialog
  try { await wait(1500); } catch (_) {}

  // 4. Hover the Cancel button
  try {
    const cancelBtn = page.getByRole("button", { name: /cancel/i }).first();
    const box = await cancelBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(600);
    }
  } catch (_) {}

  // 5. Close via Escape (AlertDialog doesn't close on outside click by design,
  //    but Radix does close on Escape)
  try {
    await page.keyboard.press("Escape");
    await wait(500);
  } catch (_) {}

  // 6. Settle
  try { await wait(300); } catch (_) {}
}
