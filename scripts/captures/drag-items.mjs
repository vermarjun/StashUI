export default async function capture(page, { W, H, cfg, wait }) {
  // Let the component fully mount and images settle
  await wait(800);

  // The three Reorder.Item rows are rendered inside a `ul` (Reorder.Group).
  // Each row has a drag handle: a motion.button[aria-label="Reorder"] on the right.
  // dragListener=false means ONLY the handle starts a drag.

  const handles = page.locator('button[aria-label="Reorder"]');

  // --- First drag: move row 1 ("Follow me on X") down past row 2 ---
  try {
    const firstHandle = handles.nth(0);
    const firstBox = await firstHandle.boundingBox();
    if (!firstBox) throw new Error('handle 0 not found');

    const startX = firstBox.x + firstBox.width / 2;
    const startY = firstBox.y + firstBox.height / 2;

    // Target: center of the second row item (roughly one row height below)
    const secondHandle = handles.nth(1);
    const secondBox = await secondHandle.boundingBox();
    if (!secondBox) throw new Error('handle 1 not found');

    const targetY = secondBox.y + secondBox.height * 1.6; // just past the second row

    // Initiate drag on the handle
    await page.mouse.move(startX, startY);
    await wait(80);
    await page.mouse.down();
    await wait(120);

    // Move incrementally so dnd-kit registers the drag properly
    const steps = 12;
    const deltaY = targetY - startY;
    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      await page.mouse.move(startX, startY + deltaY * progress, { steps: 1 });
      await wait(30);
    }

    await wait(200);
    await page.mouse.up();
    await wait(400);
  } catch (e) {
    // If handle lookup fails, release mouse and continue
    try { await page.mouse.up(); } catch (_) {}
  }

  // Brief pause so the reorder settles visually
  await wait(600);

  // --- Second drag: move new top row (originally row 2) back down one position ---
  try {
    const handles2 = page.locator('button[aria-label="Reorder"]');
    const topHandle = handles2.nth(0);
    const topBox = await topHandle.boundingBox();
    if (!topBox) throw new Error('handle 0 second pass not found');

    const startX2 = topBox.x + topBox.width / 2;
    const startY2 = topBox.y + topBox.height / 2;

    const secondHandle2 = handles2.nth(1);
    const secondBox2 = await secondHandle2.boundingBox();
    if (!secondBox2) throw new Error('handle 1 second pass not found');

    const targetY2 = secondBox2.y + secondBox2.height * 1.4;

    await page.mouse.move(startX2, startY2);
    await wait(80);
    await page.mouse.down();
    await wait(120);

    const steps2 = 10;
    const deltaY2 = targetY2 - startY2;
    for (let i = 1; i <= steps2; i++) {
      await page.mouse.move(startX2, startY2 + deltaY2 * (i / steps2), { steps: 1 });
      await wait(35);
    }

    await wait(200);
    await page.mouse.up();
    await wait(500);
  } catch (e) {
    try { await page.mouse.up(); } catch (_) {}
  }

  // Settle back near start state — list has cycled, visually interesting
  await wait(500);
}
