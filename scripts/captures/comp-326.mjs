/**
 * Choreography: comp-326
 * Sign in dialog — click "Sign in" button, dialog opens with email/password/remember-me.
 * Interact with fields, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /sign in/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog
  try { await wait(1000); } catch (_) {}

  // 4. Click into the Email field
  try {
    const emailInput = page.getByPlaceholder('hi@yourcompany.com').first();
    await emailInput.click();
    await wait(500);
  } catch (_) {}

  // 5. Click into the Password field
  try {
    const passInput = page.getByPlaceholder('Enter your password').first();
    await passInput.click();
    await wait(500);
  } catch (_) {}

  // 6. Click "Remember me" checkbox
  try {
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.click();
    await wait(600);
  } catch (_) {}

  // 7. Dwell
  try { await wait(600); } catch (_) {}

  // 8. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
