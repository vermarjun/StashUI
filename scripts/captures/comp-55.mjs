/**
 * Capture choreography for comp-55
 * Type: TEXT (masked) — Timestamp input with mask "99:99:99" (HH:MM:SS).
 * Library: use-mask-input with placeholder "-".
 * Sequence: focus field → type a realistic timestamp → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    const input = page.getByLabel(/timestamp/i);
    await input.waitFor({ state: 'visible', timeout: 4000 });
    await input.click();
    await page.waitForTimeout(300);
    // Type "01:24:37" — mask handles the colon positions
    await input.type('012437', { delay: 110 });
    await page.waitForTimeout(800);
  } catch (err) {
    try {
      const input = page.getByPlaceholder('00:00:00');
      await input.click();
      await page.waitForTimeout(300);
      await input.type('012437', { delay: 110 });
      await page.waitForTimeout(800);
    } catch (_) {
      try {
        const input = page.locator('input[type="text"]').first();
        await input.click();
        await page.waitForTimeout(300);
        await input.type('012437', { delay: 110 });
        await page.waitForTimeout(800);
      } catch (_) {}
    }
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
