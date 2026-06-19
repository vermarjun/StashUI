/**
 * Capture script: magic-ui-bento-grid
 * Choreography: hover each bento cell in sequence so the hover state (icon shrink / CTA reveal) plays.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(700);

  let cards;
  try {
    cards = await page.locator('.group.relative.col-span-3').all();
  } catch (e) {
    console.warn('magic-ui-bento-grid: could not locate bento cards', e.message);
    return;
  }

  for (const card of cards) {
    try {
      const box = await card.boundingBox();
      if (!box) continue;
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy, { steps: 8 });
      await page.waitForTimeout(500);
    } catch (e) {
      console.warn('magic-ui-bento-grid: error hovering card', e.message);
    }
  }

  // Return to a neutral position (move away from any card)
  try {
    await page.mouse.move(W / 2, 20, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('magic-ui-bento-grid: error moving to neutral', e.message);
  }
}
