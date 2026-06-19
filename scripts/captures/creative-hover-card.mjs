/**
 * Capture choreography for: creative-hover-card
 * Behaviour: 3-column grid of dark cards. On hover each card:
 *   - background gradient shifts (dark → blue/teal/red tint)
 *   - badge colour changes
 *   - title text swaps (hidden ↔ visible via group-hover)
 *   - bottom chart image fades out and an alternate image fades in, sliding up
 * Choreography: cycle through all three cards left→right, dwell ~1.2s each,
 * then return to rest between cards.
 */

export default async function choreograph({ page, W, H }) {
  // Cards are the three direct children of the 3-col grid section
  const cards = page.locator('section.grid > div');

  const count = await cards.count();
  const cardCount = Math.min(count, 3);

  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < cardCount; i++) {
      try {
        const box = await cards.nth(i).boundingBox();
        if (!box) continue;

        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;

        // Approach from neutral area
        await page.mouse.move(W / 2, 40, { steps: 8 });
        await page.waitForTimeout(200);

        // Hover onto card — image load settle
        await page.mouse.move(cx, cy, { steps: 14 });
        // Dwell: gradient shift + image crossfade needs ~700ms for images
        await page.waitForTimeout(1200);

        // Small drift to show the chart swap completing
        await page.mouse.move(cx + 10, cy - 10, { steps: 6 });
        await page.waitForTimeout(300);

        // Move away to reset state before next card
        await page.mouse.move(W / 2, 40, { steps: 10 });
        await page.waitForTimeout(400);
      } catch (e) {
        console.error(`[creative-hover-card] card ${i} pass ${pass} error:`, e.message);
      }
    }
  }

  // End near resting position
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[creative-hover-card] end error:', e.message);
  }
}
