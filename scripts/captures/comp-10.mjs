// comp-10 — email input with end icon (mail icon). Focus the field and type a
// realistic email to show the focus ring with the trailing icon.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the email input (has trailing padding for the icon)
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
    await page.keyboard.type("contact@brand.com", { delay: 65 });
  } catch { /* ignore */ }
  await wait(700);

  // Move cursor away
  try {
    await page.mouse.move(W / 2, H * 0.76, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
