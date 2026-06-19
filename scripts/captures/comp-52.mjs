/**
 * Capture choreography for comp-52
 * Type: TEXT (read-only) — A plain read-only input styled with muted background.
 * The field cannot be edited; demonstrate by clicking it (focus ring appears) then
 * trying to select-all text.
 * Sequence: click input → select all text → hover away → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    const input = page.getByLabel(/read-only/i);
    await input.waitFor({ state: 'visible', timeout: 4000 });
    // Click to focus (shows focus ring on the read-only field)
    await input.click();
    await page.waitForTimeout(500);
    // Select all — visually highlights the pre-filled text
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(700);
    // Deselect by pressing Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  } catch (err) {
    try {
      const input = page.locator('input[readonly], input[readOnly]').first();
      await input.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Control+a');
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Move away to end near label
  try {
    await page.mouse.move(W * 0.5, H * 0.35, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
