/**
 * Capture choreography for bento-grid.
 *
 * Effect: each BentoGridItem has a hover state that translates the icon/text
 * block 8 px to the right (group-hover/bento:translate-x-2) and elevates the
 * card shadow. The grid has 2 rows with wide + narrow cells.
 * Strategy: hover the first wide cell → pause → hover the narrow cell
 * (col-span-1) → pause → hover the second wide cell → pause → move off.
 * If the grid is taller than one screen the page scrolls to a midpoint first.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // BentoGridItem renders a div with rounded-xl and shadow-input class
  const items = page.locator('[class*="shadow-input"]');

  let boxes = [];
  try {
    await items.first().waitFor({ state: "visible", timeout: 8000 });
    const count = await items.count();
    for (let i = 0; i < Math.min(count, 4); i++) {
      try {
        const b = await items.nth(i).boundingBox();
        if (b) boxes.push(b);
      } catch { /* skip */ }
    }
  } catch { /* continue */ }

  // Fallback grid layout guess (4 items, 3-col grid)
  if (boxes.length < 2) {
    const colW = W / 3;
    const rowH = H * 0.35;
    boxes = [
      { x: 16, y: H * 0.08, width: colW * 2 - 32, height: rowH },
      { x: colW * 2 + 8, y: H * 0.08, width: colW - 24, height: rowH },
      { x: 16, y: H * 0.08 + rowH + 16, width: colW - 24, height: rowH },
      { x: colW + 8, y: H * 0.08 + rowH + 16, width: colW * 2 - 32, height: rowH },
    ];
  }

  await wait(700);

  // Helper: hover the centre of a bounding box
  async function hoverItem(b) {
    try {
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    } catch { /* continue */ }
  }

  // Hover first item (wide cell — row 1, col-span-2)
  await hoverItem(boxes[0]);
  await wait(750);

  // Hover second item (narrow cell — row 1, col-span-1)
  if (boxes[1]) {
    await hoverItem(boxes[1]);
    await wait(700);
  }

  // Scroll down slightly to reveal row 2 if the grid overflows
  try {
    await page.evaluate(() => window.scrollBy({ top: 200, behavior: "smooth" }));
    await wait(400);
  } catch { /* continue */ }

  // Hover third item (narrow cell — row 2, col-span-1)
  if (boxes[2]) {
    await hoverItem(boxes[2]);
    await wait(700);
  }

  // Hover fourth item (wide cell — row 2, col-span-2)
  if (boxes[3]) {
    await hoverItem(boxes[3]);
    await wait(700);
  }

  // Scroll back to top and move mouse off everything — resting state
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await wait(300);
  } catch { /* continue */ }

  try {
    await page.mouse.move(W / 2, H * 0.95);
    await wait(400);
  } catch { /* continue */ }
}
