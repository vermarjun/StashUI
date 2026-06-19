/**
 * Capture choreography for: hovercard2 (hover-card2.tsx)
 * Behaviour: Portrait profile card. Default state: image is grayscale, fills
 * ~350px of the 430px card height with name/title below. On hover:
 *   - image desaturates to full colour (grayscale-0)
 *   - image area grows (h-350 → h-410), compressing the text footer
 *   - name/title slide up off screen (-translate-y-20)
 *   - a role label fades in at the bottom from below
 * Choreography: hover in → dwell to show full colour + expanded image →
 * move away to reset → repeat once.
 */

export default async function choreograph({ page, W, H }) {
  const card = page.locator('div.group').first();

  // No remote images needed for waiting here (local /naymur.png)
  await page.waitForTimeout(400);

  for (let pass = 0; pass < 2; pass++) {
    try {
      const box = await card.boundingBox();
      if (!box) throw new Error('card not found');

      const cx = box.x + box.width / 2;
      const cy = box.y + box.height * 0.4;

      // Move onto the card (upper portion — image area)
      await page.mouse.move(cx, cy, { steps: 14 });
      // Dwell: colour transition (300ms) + text slide (300ms) + label fade
      await page.waitForTimeout(1200);

      // Drift slightly to show stable hover state
      await page.mouse.move(cx + 20, cy - 10, { steps: 6 });
      await page.waitForTimeout(300);

      // Move away
      await page.mouse.move(W / 2, 30, { steps: 12 });
      await page.waitForTimeout(600);
    } catch (e) {
      console.error(`[hovercard2] pass ${pass} error:`, e.message);
    }
  }

  // End near resting
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[hovercard2] end error:', e.message);
  }
}
