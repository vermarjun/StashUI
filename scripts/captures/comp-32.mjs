// comp-32: Input with floating label animation
// Type: TEXT/EMAIL — click to animate label up, type realistic text
// Sequence: click input → label floats up → type email → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Click the email input to trigger the float animation
  try {
    const input = page.locator('input[type="email"]');
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(500);
  } catch (_) {
    try {
      const input = page.locator("input");
      await input.click();
      await wait(500);
    } catch (_) {}
  }

  // Type realistic email address
  try {
    await page.keyboard.type("alex@example.com", { delay: 75 });
    await wait(600);
  } catch (_) {}

  // Move mouse away so label stays up (input not empty)
  try {
    await page.mouse.move(cx, cy + 80, { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
