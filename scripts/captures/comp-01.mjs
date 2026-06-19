// comp-01 — labeled email input. Focus the field and type a realistic email
// address to show the focus ring and filled value.
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
    await page.keyboard.type("jane.doe@company.com", { delay: 60 });
  } catch { /* ignore */ }
  await wait(700);

  // Move cursor away from the field
  try {
    await page.mouse.move(W / 2, H * 0.75, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
