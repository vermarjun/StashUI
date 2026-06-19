/**
 * Choreography: linear-modal-center-content
 * Hovers first card, then clicks to open the full-page dialog, dwells, closes.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle — wait for images to load
  try { await wait(1000); } catch (_) {}

  // 2. Hover the first card (before clicking)
  try {
    const card = page.locator('[class*="cursor-pointer"]').first();
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // 3. Click the first card trigger to open dialog
  try {
    // The trigger is a motion.div with role=button
    const triggers = page.locator('[role="button"][aria-haspopup="dialog"]');
    const count = await triggers.count();
    if (count > 0) {
      const box = await triggers.nth(0).boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
    } else {
      // fallback: click roughly where first card is
      await page.mouse.click(W * 0.2, H / 2);
    }
    await wait(800);
  } catch (_) {}

  // 4. Dwell on open dialog
  try { await wait(1500); } catch (_) {}

  // 5. Scroll inside dialog if tall
  try {
    const dialog = page.locator('[role="dialog"]').first();
    const box = await dialog.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
    }
    await wait(400);
  } catch (_) {}

  // 6. Close with Escape
  try {
    await page.keyboard.press('Escape');
    await wait(600);
  } catch (_) {}

  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(200); } catch (_) {}
}
