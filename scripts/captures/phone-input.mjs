/**
 * Capture choreography for phone-input
 *
 * PhoneInput renders a country-select button (flag + chevron) + a number
 * text input. Strategy:
 *   1. Click the phone number input and type a US number.
 *   2. Click the country-select button to open the Popover with the country list.
 *   3. Wait so the list is visible, then press Escape to close it.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(500); } catch (_) {}

    // Focus the phone number text input and type a US number
    try {
      const phoneInput = page.locator('input[type="tel"], input[placeholder*="phone" i], input[placeholder*="Enter" i]').first();
      await phoneInput.click();
      await phoneInput.type('2025550147', { delay: 90 });
    } catch (_) {}

    try { await wait(400); } catch (_) {}

    // Click the country select button (flag + chevron) to open the popover
    try {
      // The country select button is the first <button> in the phone input wrapper
      await page.locator('button[type="button"]').first().click();
    } catch (_) {}

    try { await wait(500); } catch (_) {}

    // Type a search term in the country command input to show filtering
    try {
      await page.getByPlaceholder('Search country...').type('Ind', { delay: 100 });
    } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Press Escape to close and return to the phone input
    try { await page.keyboard.press('Escape'); } catch (_) {}
    try { await wait(400); } catch (_) {}
  } catch (err) {
    console.error('phone-input capture error:', err);
  }
}
