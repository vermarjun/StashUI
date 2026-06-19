/**
 * Choreography: linear-modal-standalone
 * Clicks the first card in the draggable carousel to open the card-detail dialog.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle — let images load
  try { await wait(1000); } catch (_) {}

  // 2. Hover over the first card
  try {
    const card = page.locator('[role="button"]').first();
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // 3. Click first card to open dialog
  try {
    const card = page.locator('[role="button"]').first();
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W * 0.15, H / 2);
    }
    await wait(800);
  } catch (_) {}

  // 4. Dwell on open dialog — hover close button area
  try {
    const closeBtn = page.locator('[aria-label*="Close"]').first();
    const box = await closeBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(400);
    }
  } catch (_) {}

  // 5. Dwell
  try { await wait(1400); } catch (_) {}

  // 6. Close with Escape
  try {
    await page.keyboard.press('Escape');
    await wait(600);
  } catch (_) {}

  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(200); } catch (_) {}
}
