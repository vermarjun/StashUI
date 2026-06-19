// comp-33: Input with inset label (label inside the field border, above the input)
// Type: TEXT/EMAIL — click the field area then type an email address
// Sequence: click input → type email → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  // Click the email input
  try {
    const input = page.locator('input[type="email"]');
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(350);
  } catch (_) {
    try {
      const input = page.locator("input").first();
      await input.click();
      await wait(350);
    } catch (_) {}
  }

  // Type a realistic email address
  try {
    await page.keyboard.type("jane.doe@example.com", { delay: 75 });
    await wait(600);
  } catch (_) {}

  // Move away so the label+input pair is fully visible
  try {
    await page.mouse.move(cx, cy + 70, { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
