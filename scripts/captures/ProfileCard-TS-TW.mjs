/**
 * Capture script: ProfileCard-TS-TW
 * Choreography: move mouse across the card surface so the holographic tilt and glare follow.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(1000); // wait for initial tilt animation to settle

  let card;
  try {
    // The shell section is the main card surface
    card = await page.locator('section').first();
    await card.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('ProfileCard: card section not found', e.message);
    return;
  }

  const box = await card.boundingBox();
  if (!box) return;

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  try {
    // Enter the card from the top-left
    await page.mouse.move(box.x + 20, box.y + 20, { steps: 8 });
    await page.waitForTimeout(200);

    // Sweep top-left → top-right
    await page.mouse.move(box.x + box.width - 20, box.y + 20, { steps: 12 });
    await page.waitForTimeout(300);

    // Sweep top-right → bottom-right
    await page.mouse.move(box.x + box.width - 20, box.y + box.height - 20, { steps: 12 });
    await page.waitForTimeout(300);

    // Sweep bottom-right → bottom-left
    await page.mouse.move(box.x + 20, box.y + box.height - 20, { steps: 12 });
    await page.waitForTimeout(300);

    // Return to center
    await page.mouse.move(cx, cy, { steps: 10 });
    await page.waitForTimeout(500);

    // Tilt to upper-right to show glare
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.2, { steps: 10 });
    await page.waitForTimeout(500);

    // Rest back at center
    await page.mouse.move(cx, cy, { steps: 8 });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn('ProfileCard: mouse choreography error', e.message);
  }
}
