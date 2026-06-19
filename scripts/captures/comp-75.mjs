/**
 * Capture choreography for comp-75
 * Textarea with no-resize (resize handle removed via [resize:none]).
 * Sequence: click → type content → attempt drag at bottom-right corner
 * (nothing happens — demonstrates no-resize) → move away (~4s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.1, { steps: 8 });
    await page.waitForTimeout(300);

    // Focus and type
    await textarea.click({ force: true });
    await page.waitForTimeout(400);

    await textarea.type('No resize handle — keeps the layout stable and intentional.', { delay: 38 });
    await page.waitForTimeout(500);

    // Attempt resize drag at bottom-right of textarea to show it does nothing
    try {
      const box = await textarea.boundingBox();
      if (box) {
        const rx = box.x + box.width - 4;
        const ry = box.y + box.height - 4;
        await page.mouse.move(rx, ry, { steps: 8 });
        await page.waitForTimeout(400);
        await page.mouse.down();
        await page.mouse.move(rx + 40, ry + 30, { steps: 10 });
        await page.waitForTimeout(300);
        await page.mouse.up();
        await page.waitForTimeout(400);
      }
    } catch (_) {}

    // Move away
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
