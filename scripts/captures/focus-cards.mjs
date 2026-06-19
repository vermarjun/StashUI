/**
 * Capture choreography for focus-cards.
 *
 * Effect: hovering any card blurs + slightly shrinks every OTHER card.
 * The focused card stays crisp and reveals an overlay title.
 * Strategy: hover card 1 (left column) → pause so blur transition completes
 * → hover card 3 (right column) → pause → hover card 5 (centre-bottom) →
 * pause → move mouse off all cards → resting (all sharp) state.
 * Cards are in a 3-column grid; each card is ~h-96. The viewport is 1200 px
 * wide so each card column is ~380 px wide.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Cards are rendered as plain divs with class containing rounded-lg + overflow-hidden
  const cards = page.locator(".rounded-lg.overflow-hidden");

  let boxes = [];
  try {
    await cards.first().waitFor({ state: "visible", timeout: 8000 });
    const count = await cards.count();
    for (let i = 0; i < Math.min(count, 6); i++) {
      try {
        const b = await cards.nth(i).boundingBox();
        if (b) boxes.push(b);
      } catch { /* skip */ }
    }
  } catch { /* continue with empty array */ }

  // Fallback centres if selectors miss
  if (boxes.length < 3) {
    const colW = W / 3;
    const rowH = H * 0.45;
    boxes = [
      { x: colW * 0 + 20, y: H * 0.1, width: colW - 40, height: rowH },
      { x: colW * 1 + 20, y: H * 0.1, width: colW - 40, height: rowH },
      { x: colW * 2 + 20, y: H * 0.1, width: colW - 40, height: rowH },
      { x: colW * 0 + 20, y: H * 0.1 + rowH + 20, width: colW - 40, height: rowH },
      { x: colW * 1 + 20, y: H * 0.1 + rowH + 20, width: colW - 40, height: rowH },
      { x: colW * 2 + 20, y: H * 0.1 + rowH + 20, width: colW - 40, height: rowH },
    ];
  }

  await wait(700);

  // Helper: hover the centre of a card bounding box
  async function hoverCard(b) {
    try {
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    } catch { /* continue */ }
  }

  // Hover card 0 (top-left) — others blur
  await hoverCard(boxes[0]);
  await wait(750);

  // Hover card 2 (top-right)
  if (boxes[2]) {
    await hoverCard(boxes[2]);
    await wait(750);
  }

  // Hover card 4 (bottom-centre) — if exists
  if (boxes[4]) {
    await hoverCard(boxes[4]);
    await wait(750);
  }

  // Hover card 1 (top-centre)
  if (boxes[1]) {
    await hoverCard(boxes[1]);
    await wait(650);
  }

  // Move off all cards — all un-blur back to resting state
  try {
    await page.mouse.move(W / 2, H * 0.95);
    await wait(500);
  } catch { /* continue */ }
}
