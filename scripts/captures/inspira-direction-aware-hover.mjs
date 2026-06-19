/**
 * Choreography: inspira-direction-aware-hover
 * Behavior: Two 384 px (lg:w-96) cards sit side-by-side with gap-6. On mouse
 *           enter, an overlay slides in from the entry edge; on leave it slides
 *           out. Approach each card from a different edge to demonstrate all
 *           four directions.
 */
export default async function choreography(page, { W, H }) {
  // Layout: two cards centred, each ~384 px wide with gap-6 (24 px)
  // Total row width ≈ 384 + 24 + 384 = 792 px, centred → left edge at (W-792)/2
  const cardW = 384;
  const cardH = 384;
  const gap   = 24;
  const rowLeft  = (W - (cardW * 2 + gap)) / 2;
  const rowTop   = (H - cardH) / 2;

  // Card centres
  const c1 = { x: rowLeft + cardW / 2,           y: rowTop + cardH / 2 };
  const c2 = { x: rowLeft + cardW + gap + cardW / 2, y: rowTop + cardH / 2 };

  // Helper: approach a card from a given edge by starting outside it
  async function approachFrom(cx, cy, edge, dwellMs = 1200) {
    const offset = 220; // start well outside the card
    const origins = {
      top:    { x: cx,          y: cy - offset },
      bottom: { x: cx,          y: cy + offset },
      left:   { x: cx - offset, y: cy          },
      right:  { x: cx + offset, y: cy          },
    };
    const origin = origins[edge];

    try {
      // Move to the approach position (outside the card)
      await page.mouse.move(origin.x, origin.y, { steps: 15 });
      await page.waitForTimeout(150);
      // Enter the card from that edge
      await page.mouse.move(cx, cy, { steps: 18 });
      await page.waitForTimeout(dwellMs);
      // Leave: move back to a neutral spot between the cards
      await page.mouse.move(W / 2, H / 2, { steps: 15 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }

  // Start with neutral position
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await page.waitForTimeout(400);
  } catch (_) {}

  // Card 1 — approach from top
  await approachFrom(c1.x, c1.y, "top");

  // Card 1 — approach from left
  await approachFrom(c1.x, c1.y, "left");

  // Card 2 — approach from bottom
  await approachFrom(c2.x, c2.y, "bottom");

  // Card 2 — approach from right
  await approachFrom(c2.x, c2.y, "right");

  // Return near start
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 15 });
  } catch (_) {}
}
