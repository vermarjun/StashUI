/**
 * Capture choreography for: spotlight-card1 (spotlight-card1.tsx)
 * Behaviour: 5-column bento grid of dark cells. The Spotlight component tracks
 * the global mouse position and renders a radial gradient that follows the
 * cursor across each SpotLightItem (proximity spotlight + cursor flow gradient).
 * Moving the mouse across the grid makes a white glow sweep between cells.
 * Choreography: slow diagonal sweep across the grid, visiting each cell, so the
 * spotlight follows and the border glow lights up each card in sequence.
 */

export default async function choreograph({ page, W, H }) {
  // The spotlight grid container
  const grid = page.locator('div.relative.bg-black').first();

  await page.waitForTimeout(700);

  for (let pass = 0; pass < 2; pass++) {
    try {
      const box = await grid.boundingBox();
      if (!box) throw new Error('grid not found');

      const left = box.x + 20;
      const right = box.x + box.width - 20;
      const top = box.y + 20;
      const bottom = box.y + box.height - 20;
      const midY = box.y + box.height / 2;

      // Start from top-left
      await page.mouse.move(left, top, { steps: 8 });
      await page.waitForTimeout(300);

      // Sweep slowly left → right across the top row
      await page.mouse.move(right, top + 60, { steps: 30 });
      await page.waitForTimeout(200);

      // Sweep down and back left across the middle
      await page.mouse.move(left + 40, midY, { steps: 25 });
      await page.waitForTimeout(200);

      // Sweep right across the bottom area
      await page.mouse.move(right - 40, bottom - 40, { steps: 25 });
      await page.waitForTimeout(200);

      // Slow drift back to centre
      await page.mouse.move(box.x + box.width / 2, midY, { steps: 20 });
      await page.waitForTimeout(400);

      // Move away to clear spotlight
      await page.mouse.move(W / 2, 20, { steps: 12 });
      await page.waitForTimeout(500);
    } catch (e) {
      console.error(`[spotlight-card1] pass ${pass} error:`, e.message);
    }
  }

  // End near resting
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.error('[spotlight-card1] end error:', e.message);
  }
}
