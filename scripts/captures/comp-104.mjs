/**
 * Capture choreography for comp-104
 * Volume control — minus/plus circular outline buttons with dynamic volume icon + number.
 * Sequence: hover plus → click plus × 2 (volume up) → hover minus → click minus (volume down) → rest (~3.2s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const plusBtn = page.getByRole('button', { name: /increase volume/i });
    const minusBtn = page.getByRole('button', { name: /decrease volume/i });

    await plusBtn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover increase
    await plusBtn.hover();
    await page.waitForTimeout(400);

    // Click increase twice
    await plusBtn.click();
    await page.waitForTimeout(350);
    await plusBtn.click();
    await page.waitForTimeout(450);

    // Hover decrease
    await minusBtn.hover();
    await page.waitForTimeout(400);

    // Click decrease once
    await minusBtn.click();
    await page.waitForTimeout(450);

    // Rest
    await page.mouse.move(cx + 120, cy - 60);
    await page.waitForTimeout(350);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(500);
      await page.mouse.move(cx + 120, cy - 60);
      await page.waitForTimeout(350);
    } catch (_) {}
  }
}
