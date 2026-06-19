/**
 * Capture choreography for comp-107
 * Text alignment toggle group — 4 options (Left/Center/Right/Justify), solid primary colors.
 * Starts with Center active. Sequence: hover Left → click Left → hover Right → click Right → hover Justify → click Justify → rest, ending near Center (~3.5s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const leftBtn = page.getByRole('radio', { name: /align left/i });
    const rightBtn = page.getByRole('radio', { name: /align right/i });
    const justifyBtn = page.getByRole('radio', { name: /align justify/i });
    const centerBtn = page.getByRole('radio', { name: /align center/i });

    await leftBtn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover Left
    await leftBtn.hover();
    await page.waitForTimeout(400);

    // Click Left
    await leftBtn.click();
    await page.waitForTimeout(450);

    // Hover Right
    await rightBtn.hover();
    await page.waitForTimeout(400);

    // Click Right
    await rightBtn.click();
    await page.waitForTimeout(450);

    // Hover Justify
    await justifyBtn.hover();
    await page.waitForTimeout(400);

    // Click Justify
    await justifyBtn.click();
    await page.waitForTimeout(450);

    // Return to Center (near-resting state)
    await centerBtn.hover();
    await page.waitForTimeout(300);
    await centerBtn.click();
    await page.waitForTimeout(300);

    // Rest
    await page.mouse.move(cx + 120, cy - 60);
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      // Fallback: try locating by aria-label via locator
      try {
        await page.locator('[aria-label="Align Left"]').hover();
        await page.waitForTimeout(300);
        await page.locator('[aria-label="Align Left"]').click();
        await page.waitForTimeout(400);
        await page.locator('[aria-label="Align Right"]').hover();
        await page.waitForTimeout(300);
        await page.locator('[aria-label="Align Right"]').click();
        await page.waitForTimeout(400);
        await page.locator('[aria-label="Align Center"]').click();
        await page.waitForTimeout(300);
      } catch (_inner) {}
      await page.mouse.move(cx + 120, cy - 60);
      await page.waitForTimeout(300);
    } catch (_) {}
  }
}
