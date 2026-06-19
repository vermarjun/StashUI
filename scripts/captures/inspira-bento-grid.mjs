/**
 * Capture choreography for inspira-bento-grid.
 *
 * The demo renders a 2-row BentoGrid (4 BentoGridItem cards, 2×col-span-2 + 2×col-span-1).
 * On hover each card slides its footer up and dims the background.
 * Strategy: hover each cell in turn so the footer reveal animation plays, then leave
 * so the grid rests in a neutral state at the end.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow the grid to fully paint
  await wait(700);

  // Locate the bento grid wrapper — it has the auto-rows md:grid-cols-3 class
  let cells;
  try {
    const grid = page.locator(".grid.md\\:grid-cols-3").first();
    await grid.waitFor({ state: "visible", timeout: 8000 });
    cells = grid.locator("> div");
  } catch {
    cells = null;
  }

  const cellCount = cells ? await cells.count().catch(() => 0) : 0;

  if (cellCount > 0) {
    // Hover each cell sequentially; ~700 ms dwell so the slide-up animation completes
    for (let i = 0; i < cellCount; i++) {
      try {
        const cell = cells.nth(i);
        const box = await cell.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
          await wait(700);
        }
      } catch {
        // continue to next cell
      }
    }
  } else {
    // Fallback: sweep across the viewport row by row
    const rowY = [H * 0.32, H * 0.68];
    const colX = [W * 0.2, W * 0.5, W * 0.8];
    for (const y of rowY) {
      for (const x of colX) {
        try {
          await page.mouse.move(x, y, { steps: 14 });
          await wait(650);
        } catch {
          // continue
        }
      }
    }
  }

  // Move mouse off the grid so all cells rest (footer hidden)
  try {
    await page.mouse.move(W / 2, H * 0.02, { steps: 14 });
  } catch {
    // continue
  }

  // Scroll back to top so the video loop starts from the top of the grid
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  } catch {
    // continue
  }

  await wait(500);
}
