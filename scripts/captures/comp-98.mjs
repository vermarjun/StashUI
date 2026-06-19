/**
 * Capture choreography for comp-98
 * A circular outline icon button with PlusIcon that rotates 135° on click (toggle open/close).
 * Sequence: hover → click (open) → pause to show rotation → click (close) → rest (~3s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const btn = page.getByRole('button', { name: /open menu|close menu/i });
    await btn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover
    await btn.hover();
    await page.waitForTimeout(500);

    // Click to open (icon rotates to 135°)
    await btn.click();
    await page.waitForTimeout(700);

    // Hover again to show expanded state
    await btn.hover();
    await page.waitForTimeout(500);

    // Click to close (icon rotates back)
    await btn.click();
    await page.waitForTimeout(600);

    // Rest — move mouse away
    await page.mouse.move(cx + 80, cy - 60);
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(400);
      await page.mouse.move(cx + 80, cy - 60);
      await page.waitForTimeout(300);
    } catch (_) {}
  }
}
