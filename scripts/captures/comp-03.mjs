// comp-03 — email input with helper text. Focus the field and type a realistic
// email to show the focus ring, value, and helper text below.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the email input
  try {
    await page.getByPlaceholder("Email").click({ timeout: 2000 });
  } catch {
    try {
      await page.locator("input[type='email'], input").first().click({ timeout: 1500 });
    } catch { /* ignore */ }
  }
  await wait(300);

  // Type a realistic email
  try {
    await page.keyboard.type("sam@startup.io", { delay: 65 });
  } catch { /* ignore */ }
  await wait(700);

  // Move cursor away so helper text remains visible
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
