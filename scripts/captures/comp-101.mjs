/**
 * Capture choreography for comp-101
 * A bookmark toggle button with tooltip — turns indigo when active.
 * Sequence: hover (show tooltip) → click (bookmark on, indigo) → pause → click (off) → rest (~3s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const btn = page.getByRole('button', { name: /bookmark/i });
    await btn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover to trigger tooltip
    await btn.hover();
    await page.waitForTimeout(700);

    // Click to bookmark (active/indigo state)
    await btn.click();
    await page.waitForTimeout(700);

    // Hover over the active state to show updated tooltip
    await btn.hover();
    await page.waitForTimeout(600);

    // Click to un-bookmark (back to default)
    await btn.click();
    await page.waitForTimeout(500);

    // Rest
    await page.mouse.move(cx + 80, cy - 60);
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(500);
      await page.mouse.move(cx + 80, cy - 60);
      await page.waitForTimeout(300);
    } catch (_) {}
  }
}
