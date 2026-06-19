/**
 * Choreography: comp-328
 * Card details dialog — click "Card details" button, dialog shows wallet/payment form.
 * Hover over the form fields, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /card details/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog
  try { await wait(1200); } catch (_) {}

  // 4. Click into the "Name on card" field
  try {
    const nameInput = page.getByLabel(/name on card/i).first();
    await nameInput.click();
    await wait(500);
  } catch (_) {}

  // 5. Click the "Set as default" checkbox
  try {
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.click();
    await wait(600);
  } catch (_) {}

  // 6. Dwell
  try { await wait(700); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
