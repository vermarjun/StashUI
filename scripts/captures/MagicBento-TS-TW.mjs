/**
 * Capture script: MagicBento-TS-TW
 * Choreography: hover each bento cell so the per-cell glow/particles follow the cursor.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(700);

  let cards;
  try {
    cards = await page.locator('.card').all();
  } catch (e) {
    console.warn('MagicBento: could not locate .card elements', e.message);
    return;
  }

  for (const card of cards) {
    try {
      const box = await card.boundingBox();
      if (!box) continue;
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;

      // Enter and sweep within the card
      await page.mouse.move(box.x + 10, cy, { steps: 5 });
      await page.waitForTimeout(120);
      await page.mouse.move(cx, box.y + 10, { steps: 5 });
      await page.waitForTimeout(120);
      await page.mouse.move(box.x + box.width - 10, cy, { steps: 5 });
      await page.waitForTimeout(120);
      await page.mouse.move(cx, cy, { steps: 5 });
      await page.waitForTimeout(400);
    } catch (e) {
      console.warn('MagicBento: error hovering card', e.message);
    }
  }

  // End away from any card so glow fades
  try {
    await page.mouse.move(W / 2, 20, { steps: 10 });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn('MagicBento: error resetting mouse', e.message);
  }
}
