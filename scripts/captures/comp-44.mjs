// comp-44: OTP input single (4 digits in a connected slot row, built with input-otp)
// Type: OTP — click OTP container then type 4 digits one at a time
// Sequence: click first slot → type 4 digits slowly → pause (filled) → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Click the OTP input (the hidden underlying input managed by input-otp)
  try {
    const otpInput = page.locator("input[autocomplete='one-time-code']")
      .or(page.locator("input").first());
    await otpInput.waitFor({ state: "visible", timeout: 3000 });
    await otpInput.click();
    await wait(300);
  } catch (_) {
    try {
      await page.mouse.click(cx - 40, cy, { button: "left" });
      await wait(300);
    } catch (_) {}
  }

  // Type 4 realistic OTP digits with visible pacing
  try {
    const digits = "7391";
    for (const digit of digits) {
      await page.keyboard.type(digit);
      await wait(200);
    }
    await wait(700);
  } catch (_) {}

  // Move mouse away to show filled slots clearly
  try {
    await page.mouse.move(cx, cy + 80, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
