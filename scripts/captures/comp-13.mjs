// comp-13 — text input with inline add-ons (€ prefix, EUR suffix). Focus the
// field and type a realistic monetary value to show the focus ring alongside
// the inline currency symbols.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the amount input (placeholder "0.00")
  try {
    await page.getByPlaceholder("0.00").click({ timeout: 2000 });
  } catch {
    try {
      await page.locator("input[type='text'], input").first().click({ timeout: 1500 });
    } catch { /* ignore */ }
  }
  await wait(300);

  // Type a realistic monetary amount
  try {
    await page.keyboard.type("1 250.00", { delay: 70 });
  } catch { /* ignore */ }
  await wait(700);

  // Move cursor away
  try {
    await page.mouse.move(W / 2, H * 0.76, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
