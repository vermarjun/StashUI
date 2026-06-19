// origin-ui-input — plain email input. Focus the field and type a realistic
// email address to show the focus ring and filled value.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the input field
  try {
    await page.getByRole("textbox", { name: /email/i }).click({ timeout: 2000 });
  } catch {
    try {
      await page.locator("input[type='email'], input").first().click({ timeout: 1500 });
    } catch { /* ignore */ }
  }
  await wait(300);

  // Type a realistic email address
  try {
    await page.keyboard.type("alex@example.com", { delay: 60 });
  } catch { /* ignore */ }
  await wait(700);

  // Move cursor away but keep field focused for the ring
  try {
    await page.mouse.move(W / 2, H * 0.75, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
