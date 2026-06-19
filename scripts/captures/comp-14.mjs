// comp-14: Text input with external https:// block start add-on.
// Focus the field and type a domain; the add-on badge stays fixed to the left.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the input
  try {
    const input = page.getByPlaceholder("google.com");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type a realistic domain
  const domain = "myapp.dev";
  for (const ch of domain) {
    try {
      await page.keyboard.type(ch, { delay: 80 });
    } catch (_) {}
  }
  await wait(800);

  // Clear and retype to animate the sequence
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

  const domain2 = "dashboard.io";
  for (const ch of domain2) {
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
