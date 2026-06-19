// comp-16: Currency input with inline € prefix and EUR block end add-on.
// Focus and type a numeric amount; prefix and suffix stay fixed.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the input
  try {
    const input = page.getByPlaceholder("0.00");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type a realistic monetary amount
  const amount = "1,250.00";
  for (const ch of amount) {
    try {
      await page.keyboard.type(ch, { delay: 85 });
    } catch (_) {}
  }
  await wait(800);

  // Clear and type a second amount
  try {
    await page.keyboard.press("Control+a");
  } catch (_) {}
  try {
    await page.keyboard.press("Meta+a");
  } catch (_) {}
  await wait(150);
  try {
    await page.keyboard.press("Backspace");
  } catch (_) {}
  await wait(200);

  const amount2 = "49.99";
  for (const ch of amount2) {
    try {
      await page.keyboard.type(ch, { delay: 80 });
    } catch (_) {}
  }
  await wait(800);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
