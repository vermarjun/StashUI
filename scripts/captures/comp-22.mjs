// comp-22: Email input with an attached Download icon button (block style, fused border).
// Type an email then hover and click the icon button.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the input
  try {
    const input = page.getByPlaceholder("Email");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input[type='email']").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type an email address
  const email = "team@company.dev";
  for (const ch of email) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(600);

  // Hover the Subscribe icon button
  try {
    const iconBtn = page.getByRole("button", { name: /subscribe/i });
    await iconBtn.hover();
  } catch (_) {}
  await wait(450);

  // Click the icon button
  try {
    const iconBtn = page.getByRole("button", { name: /subscribe/i });
    await iconBtn.click();
  } catch (_) {
    try {
      const input = page.getByPlaceholder("Email");
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width + 18, box.y + box.height / 2);
      }
    } catch (_) {}
  }
  await wait(700);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
