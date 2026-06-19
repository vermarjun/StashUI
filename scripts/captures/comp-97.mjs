/**
 * Capture choreography for comp-97
 * A circular outline icon button with a PlusIcon — lone static button.
 * Sequence: hover → click → rest (~2.5s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  // Locate the button
  try {
    const btn = page.getByRole('button', { name: /add new item/i });
    await btn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover over the button
    await btn.hover();
    await page.waitForTimeout(600);

    // Click the button
    await btn.click();
    await page.waitForTimeout(500);

    // Move mouse away to resting state
    await page.mouse.move(cx + 80, cy - 60);
    await page.waitForTimeout(400);
  } catch (err) {
    // Fallback: move mouse to center then away
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(400);
      await page.mouse.move(cx + 80, cy - 60);
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
