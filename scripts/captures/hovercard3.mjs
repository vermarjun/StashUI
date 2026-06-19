/**
 * Capture choreography for: hovercard3 (hover-card3.tsx)
 * Behaviour: Portrait image card. Default: image fills card with name/title
 * bar pinned to the bottom. On hover:
 *   - a solid terracotta (#c34c32) overlay panel slides in from below covering
 *     the full card, revealing title, description, and a "Learn More" button
 *   - the bottom name bar fades out and slides down
 * Choreography: hover in → dwell for full reveal → move away to reset → repeat.
 */

export default async function choreograph({ page, W, H }) {
  // The card is the outermost div with class 'group'
  const card = page.locator('div.group').first();

  // Settle: remote image from Unsplash needs ~700ms
  await page.waitForTimeout(700);

  for (let pass = 0; pass < 2; pass++) {
    try {
      const box = await card.boundingBox();
      if (!box) throw new Error('card not found');

      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;

      // Move onto the card
      await page.mouse.move(cx, cy, { steps: 14 });
      // Dwell: overlay slides in (300ms transition) + content translates (300ms)
      await page.waitForTimeout(1200);

      // Small drift to confirm button is visible
      await page.mouse.move(cx, cy + 40, { steps: 6 });
      await page.waitForTimeout(300);

      // Move away to reset
      await page.mouse.move(W / 2, 30, { steps: 12 });
      await page.waitForTimeout(600);
    } catch (e) {
      console.error(`[hovercard3] pass ${pass} error:`, e.message);
    }
  }

  // End near resting
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[hovercard3] end error:', e.message);
  }
}
