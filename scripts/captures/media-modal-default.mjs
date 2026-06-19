/**
 * Choreography: media-modal-default
 * Grid shows image + video thumbnails. Clicks image to open lightbox, then video card.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(900); } catch (_) {}

  // 2. Click the image card (left cell in grid)
  try {
    const cards = page.locator('[class*="cursor-zoom-in"]');
    const count = await cards.count();
    if (count > 0) {
      const box = await cards.nth(0).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
        await wait(300);
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
    } else {
      await page.mouse.click(W * 0.25, H / 2);
    }
    await wait(900);
  } catch (_) {}

  // 3. Dwell on image lightbox
  try { await wait(1500); } catch (_) {}

  // 4. Close via Escape
  try {
    await page.keyboard.press('Escape');
    await wait(600);
  } catch (_) {}

  // 5. Click the video card (right cell)
  try {
    const cards = page.locator('[class*="cursor-zoom-in"]');
    const count = await cards.count();
    if (count > 1) {
      const box = await cards.nth(1).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
        await wait(300);
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      }
    }
    await wait(800);
  } catch (_) {}

  // 6. Dwell on video modal
  try { await wait(1000); } catch (_) {}

  // 7. Close
  try {
    await page.keyboard.press('Escape');
    await wait(600);
  } catch (_) {}

  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(200); } catch (_) {}
}
