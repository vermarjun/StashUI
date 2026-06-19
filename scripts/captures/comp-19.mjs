// comp-19: Email input with an inline Send icon button at the end.
// Type an email then click the Send (arrow) button.
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
  const email = "hello@mysite.com";
  for (const ch of email) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(600);

  // Hover then click the Subscribe / Send icon button at the end of the input
  try {
    const sendBtn = page.getByRole("button", { name: /subscribe/i });
    await sendBtn.hover();
    await wait(400);
    await sendBtn.click();
  } catch (_) {
    try {
      // fallback: click approximately where the icon button lives (far-right of input)
      const input = page.getByPlaceholder("Email");
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width - 16, box.y + box.height / 2, { steps: 8 });
        await wait(300);
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
