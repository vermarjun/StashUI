/**
 * Capture choreography for comp-54
 * Type: TEXT (masked) — Alphanumeric mask input (pattern "AA99 AAA", e.g. "AB12 CDE").
 * Library: use-mask-input. Each character slot accepts only the declared class (letter/digit).
 * Sequence: focus field → type realistic masked value → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    const input = page.getByLabel(/input with mask/i);
    await input.waitFor({ state: 'visible', timeout: 4000 });
    await input.click();
    await page.waitForTimeout(300);
    // Mask: AA99 AAA — 2 letters, 2 digits, space, 3 letters
    await input.type('SW1A 2AA', { delay: 110 });
    await page.waitForTimeout(800);
  } catch (err) {
    try {
      const input = page.getByPlaceholder(/AB12 CDE/i);
      await input.click();
      await page.waitForTimeout(300);
      await input.type('SW1A 2AA', { delay: 110 });
      await page.waitForTimeout(800);
    } catch (_) {
      try {
        const input = page.locator('input[type="text"]').first();
        await input.click();
        await page.waitForTimeout(300);
        await input.type('SW1A 2AA', { delay: 110 });
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
