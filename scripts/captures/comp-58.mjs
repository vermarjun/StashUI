// comp-58 — OTP input (spaced), 4 individual digit slots.
// Sequence: click first slot → type 4 digits one by one with short pauses → rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Click the OTP container / first slot to focus it
  try {
    const otpInput = page.locator('input[inputmode="numeric"], input[maxlength="1"], input[autocomplete="one-time-code"]').first();
    await otpInput.waitFor({ state: 'visible', timeout: 4000 });
    await otpInput.click();
    await wait(200);
  } catch {
    try {
      // OTPInput renders a hidden input; click the first visible slot div
      await page.locator('[class*="otp"], [data-input-otp]').first().click({ timeout: 3000 });
      await wait(200);
    } catch {
      try {
        await page.locator('input').first().click({ timeout: 2000 });
        await wait(200);
      } catch { /* ignore */ }
    }
  }

  // Type 4 digits with deliberate pauses to show slot-by-slot fill
  const digits = ['4', '2', '8', '1'];
  for (const digit of digits) {
    try {
      await page.keyboard.press(digit);
      await wait(280);
    } catch { /* ignore */ }
  }

  await wait(600);

  // Move mouse away to end
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 8 });
  } catch { /* ignore */ }
  await wait(300);
}
