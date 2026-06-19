/**
 * Choreography: comp-324
 * OTP code dialog — click "OTP code" button, dialog opens with 4-slot OTP input.
 * Type the correct code "6548" to verify, dwell on the verified state, then Escape.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /otp code/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog with OTP slots visible
  try { await wait(1200); } catch (_) {}

  // 4. Type the correct OTP code (6548)
  try {
    await page.keyboard.type('6548', { delay: 120 });
    await wait(1200);
  } catch (_) {}

  // 5. Dwell on "Code verified!" state
  try { await wait(800); } catch (_) {}

  // 6. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
