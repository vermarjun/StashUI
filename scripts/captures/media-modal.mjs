/**
 * Choreography: media-modal
 * Clicks the thumbnail image card to expand it into the lightbox modal, dwells, closes.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle — wait for image to load
  try { await wait(900); } catch (_) {}

  // 2. Hover the image card (cursor-zoom-in)
  try {
    const card = page.locator('[class*="cursor-zoom-in"]').first();
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // 3. Click image card to open lightbox
  try {
    const card = page.locator('[class*="cursor-zoom-in"]').first();
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W / 2, H / 2);
    }
    await wait(800);
  } catch (_) {}

  // 4. Dwell on expanded lightbox
  try { await wait(1800); } catch (_) {}

  // 5. Close by pressing Escape
  try {
    await page.keyboard.press('Escape');
    await wait(700);
  } catch (_) {}

  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
