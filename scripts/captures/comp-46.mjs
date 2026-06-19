/**
 * Capture choreography for comp-46
 * Type: PHONE — International phone number input with country-flag select (react-phone-number-input).
 * Sequence: click country select → pick "US" → focus phone input → type number → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(600);

  // Step 1: open the country-select dropdown
  try {
    const countrySelect = page.locator('select[aria-label="Select country"]');
    await countrySelect.waitFor({ state: 'attached', timeout: 4000 });
    await countrySelect.selectOption({ label: /united states/i });
    await page.waitForTimeout(500);
  } catch (err) {
    try {
      // Fallback: click the visible flag/chevron area
      await page.locator('[data-slot="phone-input"]').first().click();
      await page.waitForTimeout(500);
    } catch (_) {}
  }

  // Step 2: focus the phone number text input and type a realistic number
  try {
    const phoneInput = page.locator('[data-slot="phone-input"]');
    await phoneInput.waitFor({ state: 'visible', timeout: 4000 });
    await phoneInput.click();
    await page.waitForTimeout(300);
    await phoneInput.type('2025550143', { delay: 80 });
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      const input = page.locator('input[type="tel"], input[placeholder*="phone" i]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('2025550143', { delay: 80 });
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
