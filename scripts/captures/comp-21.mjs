// comp-21: Email input with an attached "Send" text button (block style, fused border).
// Type an email then hover and click the Send button.
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

  // Type an email address
  const email = "jane@example.org";
  for (const ch of email) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(600);

  // Hover the Send button
  try {
    const sendBtn = page.getByRole("button", { name: /send/i });
    await sendBtn.hover();
  } catch (_) {}
  await wait(450);

  // Click the Send button
  try {
    const sendBtn = page.getByRole("button", { name: /send/i });
    await sendBtn.click();
  } catch (_) {
    try {
      await page.mouse.click(W / 2 + 100, H / 2);
    } catch (_) {}
  }
  await wait(700);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
