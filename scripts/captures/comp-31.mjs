// comp-31: Input with overlapping (top-left) label
// Type: TEXT/EMAIL — click + type realistic email address
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
    await wait(300);
  } catch (_) {
    try {
      const input = page.locator("input").first();
      await input.click();
      await wait(300);
    } catch (_) {}
  }

  // Type realistic email
  try {
    await page.keyboard.type("hello@mysite.io", { delay: 80 });
    await wait(600);
  } catch (_) {}

  // Move mouse near start
  try {
    await page.mouse.move(cx, cy + 60, { steps: 8 });
    await wait(400);
  } catch (_) {}
}
