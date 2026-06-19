// comp-05 — email input with colored border and ring (indigo). Focus the field
// and type a realistic email to show the custom-colored focus ring.
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

  // Type a realistic email to reveal the colored ring
  try {
    await page.keyboard.type("robin@design.co", { delay: 65 });
  } catch { /* ignore */ }
  await wait(800);

  // Move cursor away while ring stays visible
  try {
    await page.mouse.move(W / 2, H * 0.78, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
