// comp-02: Required email input with red asterisk label decoration.
// Focus the field and type a realistic email address.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the input
  try {
    const input = page.getByPlaceholder("Email");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input[type='email']").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type a realistic email
  const email = "alex@example.com";
  for (const ch of email) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(800);

  // Select all and replace to show editing flow
  try {
    await page.keyboard.press("Control+a");
  } catch (_) {}
  try {
    await page.keyboard.press("Meta+a");
  } catch (_) {}
  await wait(200);
  try {
    await page.keyboard.press("Backspace");
  } catch (_) {}
  await wait(200);

  const email2 = "user@company.io";
  for (const ch of email2) {
    try {
      await page.keyboard.type(ch, { delay: 70 });
    } catch (_) {}
  }
  await wait(800);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
