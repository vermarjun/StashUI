// comp-11: Text input with inline https:// start add-on.
// Focus the field and type a domain to show it live after the prefix.
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
  const domain = "mysite.io";
  for (const ch of domain) {
    try {
      await page.keyboard.type(ch, { delay: 80 });
    } catch (_) {}
  }
  await wait(700);

  // Select all and retype to show a second value
  try {
    await page.keyboard.press("Control+a");
  } catch (_) {}
  try {
    await page.keyboard.press("Meta+a");
  } catch (_) {}
  await wait(200);
  try {
    await page.keyboard.press("Backspace");
  } catch (_) {}
  await wait(200);

  const domain2 = "example.com";
  for (const ch of domain2) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(800);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
