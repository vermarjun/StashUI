/**
 * Capture choreography for: hovercard4 (hover-card4.tsx)
 * Behaviour: Blog-style card with a top image and text below. On hover:
 *   - image zooms out (scale-105 → scale-100)
 *   - in the CTA button, the single ChevronRight icon fades out + slides down
 *     while a ChevronsRight icon fades in + slides up
 * Choreography: hover onto card image → dwell to trigger zoom → move to CTA
 * button area to show icon swap → move away → repeat once.
 */

export default async function choreograph({ page, W, H }) {
  const card = page.locator('div.group').first();

  // Settle: remote Unsplash image
  await page.waitForTimeout(700);

  for (let pass = 0; pass < 2; pass++) {
    try {
      const box = await card.boundingBox();
      if (!box) throw new Error('card not found');

      const cx = box.x + box.width / 2;
      // Top portion = image area
      const imageCy = box.y + box.height * 0.3;
      // Bottom portion = CTA link area
      const ctaCy = box.y + box.height * 0.82;

      // Hover onto image
      await page.mouse.move(cx, imageCy, { steps: 12 });
      await page.waitForTimeout(800);

      // Move down to CTA to trigger icon transition
      await page.mouse.move(cx, ctaCy, { steps: 10 });
      await page.waitForTimeout(700);

      // Drift slightly
      await page.mouse.move(cx + 20, ctaCy, { steps: 6 });
      await page.waitForTimeout(300);

      // Move away
      await page.mouse.move(W / 2, 30, { steps: 12 });
      await page.waitForTimeout(600);
    } catch (e) {
      console.error(`[hovercard4] pass ${pass} error:`, e.message);
    }
  }

  // End near resting
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[hovercard4] end error:', e.message);
  }
}
