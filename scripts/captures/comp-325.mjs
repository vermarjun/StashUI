/**
 * Choreography: comp-325
 * Sign up dialog — click "Sign up" button, dialog opens with name/email/password fields.
 * Hover over form fields then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /sign up/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog
  try { await wait(1000); } catch (_) {}

  // 4. Click into the Full name field
  try {
    const nameInput = page.getByPlaceholder('Matt Welsh');
    await nameInput.click();
    await wait(500);
  } catch (_) {}

  // 5. Click into the Email field
  try {
    const emailInput = page.getByPlaceholder('hi@yourcompany.com').first();
    await emailInput.click();
    await wait(500);
  } catch (_) {}

  // 6. Dwell
  try { await wait(800); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
