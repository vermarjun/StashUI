// comp-45: OTP input double (6 digits split 3|sep|3, built with input-otp)
// Type: OTP — click OTP container then type 6 digits
// Sequence: click first slot → type all 6 digits → pause (filled) → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Click the OTP input (the hidden input-otp underlying input)
  try {
    const otpInput = page.locator("input[autocomplete='one-time-code']")
      .or(page.locator("input").first());
    await otpInput.waitFor({ state: "visible", timeout: 3000 });
    await otpInput.click();
    await wait(300);
  } catch (_) {
    try {
      await page.mouse.click(cx - 80, cy, { button: "left" });
      await wait(300);
    } catch (_) {}
  }

  // Type 6 realistic OTP digits
  try {
    const digits = "482916";
    for (const digit of digits) {
      await page.keyboard.type(digit);
      await wait(150);
    }
    await wait(600);
  } catch (_) {}

  // Move mouse away from OTP slots
  try {
    await page.mouse.move(cx, cy + 80, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
