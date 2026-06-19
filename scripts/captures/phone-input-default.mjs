/**
 * Capture choreography for phone-input-default
 *
 * Shares phone-input.demo.tsx (SHARED — demo must NOT be edited for this variant).
 * Same component and layout as phone-input; capture mirrors that choreography.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(500); } catch (_) {}

    // Focus the phone number text input and type a number
    try {
      const phoneInput = page.locator('input[type="tel"], input[placeholder*="phone" i], input[placeholder*="Enter" i]').first();
      await phoneInput.click();
      await phoneInput.type('4155550123', { delay: 90 });
    } catch (_) {}

    try { await wait(400); } catch (_) {}

    // Click the country select button to open the popover
    try {
      await page.locator('button[type="button"]').first().click();
    } catch (_) {}

    try { await wait(500); } catch (_) {}

    // Type a search term to show filtering
    try {
      await page.getByPlaceholder('Search country...').type('Can', { delay: 100 });
    } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Escape to close
    try { await page.keyboard.press('Escape'); } catch (_) {}
    try { await wait(400); } catch (_) {}
  } catch (err) {
    console.error('phone-input-default capture error:', err);
  }
}
