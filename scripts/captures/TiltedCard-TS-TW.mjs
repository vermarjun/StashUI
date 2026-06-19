/**
 * Capture script: TiltedCard-TS-TW
 * Choreography: move mouse around the card surface so it tilts in 3D; visit all four quadrants.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(700);

  let card;
  try {
    card = await page.locator('figure').first();
    await card.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('TiltedCard: figure not found', e.message);
    return;
  }

  const box = await card.boundingBox();
  if (!box) return;

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  // Quadrant positions
  const topLeft     = { x: box.x + box.width * 0.2,  y: box.y + box.height * 0.2 };
  const topRight    = { x: box.x + box.width * 0.8,  y: box.y + box.height * 0.2 };
  const bottomRight = { x: box.x + box.width * 0.8,  y: box.y + box.height * 0.8 };
  const bottomLeft  = { x: box.x + box.width * 0.2,  y: box.y + box.height * 0.8 };

  try {
    // Enter the card at center
    await page.mouse.move(cx, cy, { steps: 8 });
    await page.waitForTimeout(200);

    // Tilt upper-left (rotateX+, rotateY-)
    await page.mouse.move(topLeft.x, topLeft.y, { steps: 10 });
    await page.waitForTimeout(500);

    // Tilt upper-right (rotateX+, rotateY+)
    await page.mouse.move(topRight.x, topRight.y, { steps: 14 });
    await page.waitForTimeout(500);

    // Tilt lower-right (rotateX-, rotateY+)
    await page.mouse.move(bottomRight.x, bottomRight.y, { steps: 14 });
    await page.waitForTimeout(500);

    // Tilt lower-left (rotateX-, rotateY-)
    await page.mouse.move(bottomLeft.x, bottomLeft.y, { steps: 14 });
    await page.waitForTimeout(500);

    // Return to center (card springs back to neutral on mouse leave)
    await page.mouse.move(cx, cy, { steps: 10 });
    await page.waitForTimeout(300);

    // Leave the card so it returns to flat
    await page.mouse.move(W / 2, 20, { steps: 12 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.warn('TiltedCard: mouse choreography error', e.message);
  }
}
