/**
 * Capture script: SpotlightCard-TS-TW
 * Choreography: move mouse slowly across the card so the radial spotlight follows the cursor.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(700);

  let card;
  try {
    card = await page.locator('.relative.rounded-3xl').first();
    await card.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('SpotlightCard: card not found', e.message);
    return;
  }

  const box = await card.boundingBox();
  if (!box) return;

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  try {
    // Enter from the left
    await page.mouse.move(box.x + 10, cy, { steps: 8 });
    await page.waitForTimeout(150);

    // Diagonal sweep: top-left → bottom-right
    await page.mouse.move(box.x + 20, box.y + 20, { steps: 6 });
    await page.waitForTimeout(200);
    await page.mouse.move(box.x + box.width - 20, box.y + box.height - 20, { steps: 16 });
    await page.waitForTimeout(300);

    // Diagonal sweep: bottom-right → top-right
    await page.mouse.move(box.x + box.width - 20, box.y + 20, { steps: 10 });
    await page.waitForTimeout(300);

    // Sweep back through center
    await page.mouse.move(cx, cy, { steps: 8 });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn('SpotlightCard: mouse choreography error', e.message);
  }
}
