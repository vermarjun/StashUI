/**
 * Choreography: comp-329
 * Checkout dialog — click "Checkout" button, dialog shows monthly/yearly radio,
 * card details, and a coupon link.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /checkout/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog (yearly is selected by default)
  try { await wait(1000); } catch (_) {}

  // 4. Click the "Monthly" radio option
  try {
    await page.getByText('Monthly').first().click();
    await wait(600);
  } catch (_) {}

  // 5. Click the "Yearly" radio option back
  try {
    await page.getByText('Yearly').first().click();
    await wait(600);
  } catch (_) {}

  // 6. Click "+ Add coupon" to reveal coupon input
  try {
    await page.getByText('+ Add coupon').click();
    await wait(700);
  } catch (_) {}

  // 7. Dwell on coupon field
  try { await wait(600); } catch (_) {}

  // 8. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
