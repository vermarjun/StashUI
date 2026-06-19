/**
 * Capture choreography for: stripecard (stripe-card.tsx)
 * Behaviour: Stripe-style gradient card — on hover, a blue gradient overlay
 * fades in over the image, the image shifts down, and a "Learn about Atlas"
 * CTA link slides up into view. Mouse across the card triggers the shine/overlay
 * tracking effect.
 */

export default async function choreograph({ page, W, H }) {
  // Locate the card — it is the outermost group container
  const card = page.locator('.group').first();

  // --- Pass 1: hover in → dwell → hover out ---
  try {
    const box = await card.boundingBox();
    if (!box) throw new Error('card not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Move onto the card
    await page.mouse.move(cx, cy, { steps: 12 });
    // Dwell so gradient overlay and CTA slide in
    await page.waitForTimeout(1200);
    // Drag mouse slightly across to show shine tracking
    await page.mouse.move(cx - 40, cy - 20, { steps: 10 });
    await page.waitForTimeout(400);
    await page.mouse.move(cx + 40, cy + 20, { steps: 10 });
    await page.waitForTimeout(400);
    // Move away to reset
    await page.mouse.move(W / 2, 40, { steps: 12 });
    await page.waitForTimeout(600);
  } catch (e) {
    console.error('[stripecard] pass 1 error:', e.message);
  }

  // --- Pass 2: repeat for looped video ---
  try {
    const box = await card.boundingBox();
    if (!box) throw new Error('card not found pass 2');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);
    await page.mouse.move(cx + 50, cy - 30, { steps: 10 });
    await page.waitForTimeout(400);
    // End near resting (off card)
    await page.mouse.move(W / 2, 40, { steps: 12 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.error('[stripecard] pass 2 error:', e.message);
  }
}
