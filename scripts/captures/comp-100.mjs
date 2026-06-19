/**
 * Capture choreography for comp-100
 * A hamburger menu icon button that animates to an X on click.
 * Sequence: hover → click (hamburger→X) → pause → click (X→hamburger) → rest (~3.2s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const btn = page.getByRole('button', { name: /open menu|close menu/i });
    await btn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover to show intent
    await btn.hover();
    await page.waitForTimeout(500);

    // Click to open (hamburger → X animation)
    await btn.click();
    await page.waitForTimeout(800);

    // Hover while in X state
    await btn.hover();
    await page.waitForTimeout(500);

    // Click to close (X → hamburger animation)
    await btn.click();
    await page.waitForTimeout(700);

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
