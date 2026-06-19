// comp-09 — email input with start icon (@ sign). Focus the field and type a
// realistic email to show the focus ring with the leading icon.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the email input (has leading padding for the icon)
  try {
    await page.getByPlaceholder("Email").click({ timeout: 2000 });
  } catch {
    try {
      await page.locator("input[type='email'], input").first().click({ timeout: 1500 });
    } catch { /* ignore */ }
  }
  await wait(300);

  // Type a realistic email to show the icon + value together
  try {
    await page.keyboard.type("hello@myapp.dev", { delay: 65 });
  } catch { /* ignore */ }
  await wait(700);

  // Move cursor away
  try {
    await page.mouse.move(W / 2, H * 0.76, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
