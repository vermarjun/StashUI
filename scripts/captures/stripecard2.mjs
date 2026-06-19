/**
 * Capture choreography for: stripecard2 (stripe-card2.tsx)
 * Behaviour: Full-bleed image card with green gradient overlay. On hover:
 *   - image zooms out (scale-105 → scale-100)
 *   - article slides up from -bottom-10 to bottom-0
 *   - "Read Story" CTA fades and translates in
 * Mouse across the card makes the gradient/shine track the cursor.
 */

export default async function choreograph({ page, W, H }) {
  // The card is a relative-positioned div with the group class
  const card = page.locator('div.group').first();

  // --- Pass 1 ---
  try {
    const box = await card.boundingBox();
    if (!box) throw new Error('card not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Settle: image may take time to load from Unsplash
    await page.waitForTimeout(700);

    // Move onto the card
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);

    // Drag across to show gradient tracking
    await page.mouse.move(cx - 50, cy - 30, { steps: 10 });
    await page.waitForTimeout(350);
    await page.mouse.move(cx + 50, cy + 20, { steps: 10 });
    await page.waitForTimeout(350);

    // Move away
    await page.mouse.move(W / 2, 30, { steps: 12 });
    await page.waitForTimeout(600);
  } catch (e) {
    console.error('[stripecard2] pass 1 error:', e.message);
  }

  // --- Pass 2 ---
  try {
    const box = await card.boundingBox();
    if (!box) throw new Error('card not found pass 2');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);
    await page.mouse.move(cx + 40, cy - 20, { steps: 10 });
    await page.waitForTimeout(400);

    // End near resting
    await page.mouse.move(W / 2, 30, { steps: 10 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.error('[stripecard2] pass 2 error:', e.message);
  }
}
