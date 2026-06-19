// comp-35: Input with characters-left counter (maxLength 8, shows "X characters left")
// Type: TEXT — click + type to watch the remaining counter count down
// Sequence: click → type chars one-by-one → counter drops → backspace one → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  // Click the input
  try {
    const input = page.locator('input[type="text"]').first();
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(350);
  } catch (_) {}

  // Type chars slowly so the counter changes are visible (maxLength 8)
  try {
    await page.keyboard.type("username", { delay: 160 });
    await wait(600);
  } catch (_) {}

  // Delete one char to show the counter can go back up
  try {
    await page.keyboard.press("Backspace");
    await wait(500);
  } catch (_) {}

  // Move mouse away so the "characters left" text is clearly visible
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
