/**
 * Capture choreography for comp-446
 * Breadcrumb with ellipsis DropdownMenu overflow trigger.
 * Sequence: dwell on breadcrumb → click ellipsis to open dropdown → dwell with
 * menu open → press Escape to close → rest.
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

  // Click the ellipsis trigger to open the dropdown
  try {
    const ellipsisTrigger = page.locator('[aria-label="Toggle menu"], button:has([aria-hidden="true"])').first();
    await ellipsisTrigger.waitFor({ state: 'visible', timeout: 4000 });
    await ellipsisTrigger.click();
    await wait(1400);
  } catch (err) {
    try {
      // Try clicking via the BreadcrumbEllipsis (rendered as a button)
      const trigger = page.locator('button').filter({ hasText: '' }).first();
      await trigger.click();
      await wait(1400);
    } catch (_) {}
  }

  // Close dropdown with Escape
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
