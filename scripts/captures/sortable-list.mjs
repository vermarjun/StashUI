/**
 * Capture choreography for sortable-list
 *
 * The component uses Framer Motion's Reorder. Items are Reorder.Item elements
 * (rendered as li by default). The drag is initiated via pointerdown on the
 * Reorder.Item itself (dragControls are bound to a child div's onPointerDown,
 * but dragListener is true unless checked — so the whole item card is draggable
 * when unchecked).
 *
 * Strategy:
 *   1. Dwell so items animate in.
 *   2. Drag row 0 ("Design system tokens") down past row 1 — slow move in 12 steps.
 *   3. Release, wait for spring to settle.
 *   4. Click the checkbox on the new row 0 to show the checked/delete state.
 *   5. Wait, then uncheck to cycle back toward start state for clean loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Let all items animate in (opacity: 0 → 1 spring)
  try {
    await wait(900);
  } catch (_) {}

  // --- Drag: move row 0 down past row 1 ---
  try {
    // Reorder.Item elements are rendered as `li` inside the Reorder.Group `ul`
    const rows = page.locator('li');
    const row0 = rows.nth(0);
    const row0Box = await row0.boundingBox();
    if (!row0Box) throw new Error('row 0 not found');

    const row1 = rows.nth(1);
    const row1Box = await row1.boundingBox();
    if (!row1Box) throw new Error('row 1 not found');

    const startX = row0Box.x + row0Box.width * 0.4;
    const startY = row0Box.y + row0Box.height / 2;
    // Target: just below center of row 1 so reorder triggers
    const targetY = row1Box.y + row1Box.height * 0.75;

    await page.mouse.move(startX, startY, { steps: 4 });
    await wait(60);
    await page.mouse.down();
    await wait(100);

    const steps = 12;
    const deltaY = targetY - startY;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(startX, startY + deltaY * (i / steps), { steps: 1 });
      await wait(35);
    }

    await wait(180);
    await page.mouse.up();
    await wait(500);
  } catch (e) {
    try { await page.mouse.up(); } catch (_) {}
  }

  // --- Checkbox: mark the new top row as complete to show the delete UX ---
  try {
    // Checkboxes have role="checkbox" or id starting with "checkbox-"
    const checkboxes = page.locator('[id^="checkbox-"]');
    const cb0 = checkboxes.nth(0);
    const cbBox = await cb0.boundingBox();
    if (cbBox) {
      await page.mouse.move(cbBox.x + cbBox.width / 2, cbBox.y + cbBox.height / 2, { steps: 6 });
      await wait(200);
      await page.mouse.click(cbBox.x + cbBox.width / 2, cbBox.y + cbBox.height / 2);
      await wait(700);
    }
  } catch (_) {}

  // --- Uncheck to cycle toward start state ---
  try {
    const checkboxes = page.locator('[id^="checkbox-"]');
    const cb0 = checkboxes.nth(0);
    const cbBox = await cb0.boundingBox();
    if (cbBox) {
      await page.mouse.move(cbBox.x + cbBox.width / 2, cbBox.y + cbBox.height / 2, { steps: 5 });
      await wait(150);
      await page.mouse.click(cbBox.x + cbBox.width / 2, cbBox.y + cbBox.height / 2);
      await wait(500);
    }
  } catch (_) {}

  // Settle near start
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
