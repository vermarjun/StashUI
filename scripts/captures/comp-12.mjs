// comp-12: Input with end inline add-on (".com" suffix)
// Type: TEXT — click + type a domain name; the ".com" suffix is always visible
// Sequence: click input → type domain → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  // Click the text input (placeholder "google")
  try {
    const input = page.getByPlaceholder("google");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(300);
  } catch (_) {
    try {
      const input = page.locator('input[type="text"]').first();
      await input.click();
      await wait(300);
    } catch (_) {}
  }

  // Type a realistic domain name (no .com — the addon shows it)
  try {
    await page.keyboard.type("myportfolio", { delay: 90 });
    await wait(700);
  } catch (_) {}

  // Move mouse to reveal the .com suffix is still visible
  try {
    await page.mouse.move(cx + 100, cy, { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
