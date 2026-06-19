/**
 * Capture script: PixelCard-TS-TW
 * Choreography: hover the card so the pixel-reveal animation plays, then move away so pixels disappear.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(700);

  let card;
  try {
    card = await page.locator('.relative.overflow-hidden.grid.place-items-center').first();
    await card.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('PixelCard: card not found', e.message);
    return;
  }

  const box = await card.boundingBox();
  if (!box) return;

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  try {
    // Move onto the card to trigger pixel appear animation
    await page.mouse.move(cx, cy, { steps: 10 });
    await page.waitForTimeout(200);

    // Let pixels fully appear (animation runs ~1-2s depending on distance delays)
    await page.waitForTimeout(1800);

    // Move away so pixels begin to disappear; end at top of viewport
    await page.mouse.move(cx, 20, { steps: 15 });
    await page.waitForTimeout(600);
  } catch (e) {
    console.warn('PixelCard: mouse choreography error', e.message);
  }
}
