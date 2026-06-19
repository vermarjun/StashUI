// comp-15: Text input with .com block end add-on.
// Focus and type a subdomain; the .com badge stays fixed to the right.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the input
  try {
    const input = page.getByPlaceholder("google");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type a domain stem
  const stem = "acme-labs";
  for (const ch of stem) {
    try {
      await page.keyboard.type(ch, { delay: 80 });
    } catch (_) {}
  }
  await wait(800);

  // Clear and type a second one
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

  const stem2 = "startupname";
  for (const ch of stem2) {
    try {
      await page.keyboard.type(ch, { delay: 70 });
    } catch (_) {}
  }
  await wait(800);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
