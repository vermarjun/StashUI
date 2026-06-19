/**
 * Capture choreography for card-hover-effect (HoverEffect grid).
 *
 * Effect: hovering a card slides a shared animated background (layoutId
 * "hoverBackground") under it with a rounded rectangle highlight. Moving
 * between cards causes the highlight to glide from one to the next.
 * Strategy: hover card 0 → glide to card 1 → glide to card 2 → glide to
 * card 4 → glide to card 5 → back to card 3 → leave grid → resting state.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // All grid cells are <a> tags wrapping <Card>
  const links = page.locator("a.relative.group");

  let boxes = [];
  try {
    await links.first().waitFor({ state: "visible", timeout: 8000 });
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      try {
        const b = await links.nth(i).boundingBox();
        if (b) boxes.push(b);
      } catch { /* skip */ }
    }
  } catch {
    // Fall back: rough grid positions for 6 items in a 3-col layout
    const colW = W / 3;
    const rowH = H / 2;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        boxes.push({
          x: c * colW + colW * 0.1,
          y: r * rowH + rowH * 0.1,
          width: colW * 0.8,
          height: rowH * 0.8,
        });
      }
    }
  }

  function centre(b) {
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  }

  await wait(400);

  // Visit order: 0 → 1 → 2 → 4 → 5 → 3 (zigzag across grid)
  const visitOrder = [0, 1, 2, 4, 5, 3].filter((i) => i < boxes.length);

  for (const idx of visitOrder) {
    const { x, y } = centre(boxes[idx]);
    try {
      await page.mouse.move(x, y, { steps: 8 });
      await wait(420);
    } catch { /* continue */ }
  }

  // Leave the grid entirely — highlight fades out (resting state)
  try {
    await page.mouse.move(W / 2, H + 40);
    await wait(350);
  } catch { /* continue */ }
}
