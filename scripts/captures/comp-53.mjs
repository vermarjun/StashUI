/**
 * Capture choreography for comp-53
 * Type: TEXT (read-only) + COPY BUTTON — Pre-filled install command input with a
 * copy-to-clipboard icon button. Tooltip appears on hover; icon flips to checkmark after copy.
 * Sequence: hover copy button (tooltip appears) → click copy → checkmark shown → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    // Hover the copy button to trigger the tooltip
    const copyBtn = page.getByRole('button', { name: /copy to clipboard/i });
    await copyBtn.waitFor({ state: 'visible', timeout: 4000 });
    await copyBtn.hover();
    await page.waitForTimeout(700);

    // Click to copy — icon transitions to checkmark
    await copyBtn.click();
    await page.waitForTimeout(900);

    // Hover away so tooltip dismisses before clip ends
    await page.mouse.move(W * 0.5, H * 0.35, { steps: 8 });
    await page.waitForTimeout(400);
  } catch (err) {
    try {
      const btn = page.locator('button').first();
      await btn.hover();
      await page.waitForTimeout(700);
      await btn.click();
      await page.waitForTimeout(900);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
