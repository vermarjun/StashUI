/**
 * Capture choreography for comp-49
 * Type: TEXT (masked) — CVC / security code input (3 digits) via react-payment-inputs.
 * Sequence: focus field → type 3-digit CVC → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    const cvcInput = page.getByLabel(/code/i);
    await cvcInput.waitFor({ state: 'visible', timeout: 4000 });
    await cvcInput.click();
    await page.waitForTimeout(300);
    await cvcInput.type('123', { delay: 130 });
    await page.waitForTimeout(800);
  } catch (err) {
    try {
      const input = page.locator('input[name="cvc"], input[placeholder*="CVC" i]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('123', { delay: 130 });
      await page.waitForTimeout(800);
    } catch (_) {
      try {
        const input = page.locator('input').first();
        await input.click();
        await page.waitForTimeout(300);
        await input.type('123', { delay: 130 });
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
