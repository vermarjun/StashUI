/**
 * Capture choreography for comp-447
 * Breadcrumb with FoldersIcon DropdownMenu overflow trigger.
 * Sequence: dwell on breadcrumb → click folder-icon trigger to open dropdown →
 * dwell with menu open → press Escape → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Dwell on breadcrumb area
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(600);
  } catch (_) {}

  // Click the FoldersIcon dropdown trigger
  try {
    const trigger = page.locator('button').filter({ has: page.locator('svg') }).first();
    await trigger.waitFor({ state: 'visible', timeout: 4000 });
    await trigger.click();
    await wait(1400);
  } catch (err) {
    try {
      await page.mouse.move(cx - 60, cy, { steps: 8 });
      await page.mouse.click(cx - 60, cy);
      await wait(1400);
    } catch (_) {}
  }

  // Hover over "Documentation" item to show hover state
  try {
    const docItem = page.getByRole('menuitem', { name: /documentation/i });
    await docItem.hover();
    await wait(600);
  } catch (_) {}

  // Close with Escape
  try {
    await page.keyboard.press('Escape');
    await wait(500);
  } catch (_) {}

  // End near start position
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
