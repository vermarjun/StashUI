/**
 * Capture script: magic-card
 * Choreography: move mouse slowly across the card so the gradient/spotlight follows the cursor.
 */
export default async function capture({ page, W, H }) {
  // Locate the card element
  let card;
  try {
    card = await page.locator('.group.relative.isolate').first();
    await card.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('magic-card: card not found, skipping mouse moves', e.message);
    return;
  }

  const box = await card.boundingBox();
  if (!box) return;

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  // Settle after mount
  await page.waitForTimeout(700);

  // Enter the card from the left edge
  try {
    await page.mouse.move(box.x + 10, cy);
    await page.waitForTimeout(120);

    // Sweep slowly left → right across the top third
    for (let step = 0; step <= 10; step++) {
      const x = box.x + (box.width / 10) * step;
      const y = box.y + box.height * 0.3;
      await page.mouse.move(x, y, { steps: 3 });
      await page.waitForTimeout(80);
    }

    // Sweep slowly right → left across the bottom third
    for (let step = 10; step >= 0; step--) {
      const x = box.x + (box.width / 10) * step;
      const y = box.y + box.height * 0.7;
      await page.mouse.move(x, y, { steps: 3 });
      await page.waitForTimeout(80);
    }

    // Rest near center
    await page.mouse.move(cx, cy, { steps: 5 });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn('magic-card: mouse choreography error', e.message);
  }
}
