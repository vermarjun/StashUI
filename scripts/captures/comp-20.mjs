// comp-20: Email input with inline end icon button (DownloadIcon inside the field border).
// Type an email, hover the icon button, then click it.
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
  const email = "notifications@app.io";
  for (const ch of email) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(600);

  // Hover the inline Subscribe button (icon at the end of the field)
  try {
    const iconBtn = page.getByRole("button", { name: /subscribe/i });
    await iconBtn.hover();
  } catch (_) {
    try {
      const input = page.getByPlaceholder("Email");
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width - 16, box.y + box.height / 2, { steps: 8 });
      }
    } catch (_) {}
  }
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
        await page.mouse.click(box.x + box.width - 16, box.y + box.height / 2);
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
