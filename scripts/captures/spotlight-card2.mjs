/**
 * Capture choreography for: spotlight-card2 (spotlight-card2.tsx)
 * Behaviour: Single dark card with a chat UI image inside a Spotlight wrapper.
 * ProximitySpotlight is disabled; CursorFlowGradient is active — moving the
 * mouse across the card produces a white radial gradient that follows the
 * cursor over the card surface (hover-triggered on the SpotLightItem).
 * Choreography: move mouse slowly across the card in a figure-8 pattern so the
 * glow tracks visibly, then exit the card to reset.
 */

export default async function choreograph({ page, W, H }) {
  // The SpotLightItem wraps the card content
  const card = page.locator('div.relative.bg-black').first();

  await page.waitForTimeout(700);

  for (let pass = 0; pass < 2; pass++) {
    try {
      const box = await card.boundingBox();
      if (!box) throw new Error('card not found');

      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      const rx = box.width * 0.35;
      const ry = box.height * 0.3;

      // Approach from outside
      await page.mouse.move(cx, box.y - 20, { steps: 8 });
      await page.waitForTimeout(200);

      // Enter card — triggers isHovered → gradient appears
      await page.mouse.move(cx, cy, { steps: 10 });
      await page.waitForTimeout(400);

      // Sweep: left → right across top half
      await page.mouse.move(cx - rx, cy - ry, { steps: 18 });
      await page.waitForTimeout(200);
      await page.mouse.move(cx + rx, cy - ry, { steps: 18 });
      await page.waitForTimeout(200);

      // Sweep: right → left across bottom half
      await page.mouse.move(cx + rx, cy + ry, { steps: 18 });
      await page.waitForTimeout(200);
      await page.mouse.move(cx - rx, cy + ry, { steps: 18 });
      await page.waitForTimeout(200);

      // Return to centre
      await page.mouse.move(cx, cy, { steps: 10 });
      await page.waitForTimeout(400);

      // Exit card — gradient fades out
      await page.mouse.move(cx, box.y - 20, { steps: 10 });
      await page.waitForTimeout(500);
    } catch (e) {
      console.error(`[spotlight-card2] pass ${pass} error:`, e.message);
    }
  }

  // End near resting
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[spotlight-card2] end error:', e.message);
  }
}
