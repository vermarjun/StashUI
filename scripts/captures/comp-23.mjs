// comp-23: Password input with show/hide eye toggle button.
// Type a password (shows dots), click the eye to reveal it, then click to hide again.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the password input
  try {
    const input = page.getByPlaceholder("Password");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input[type='password'], input").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type a password (rendered as dots initially)
  const password = "Secr3t!Pass";
  for (const ch of password) {
    try {
      await page.keyboard.type(ch, { delay: 80 });
    } catch (_) {}
  }
  await wait(700);

  // Hover the show/hide toggle
  try {
    const toggleBtn = page.getByRole("button", { name: /show password/i });
    await toggleBtn.hover();
  } catch (_) {}
  await wait(350);

  // Click to reveal password
  try {
    const toggleBtn = page.getByRole("button", { name: /show password/i });
    await toggleBtn.click();
  } catch (_) {
    try {
      const input = page.getByPlaceholder("Password");
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width - 16, box.y + box.height / 2);
      }
    } catch (_) {}
  }
  await wait(800);

  // Hover the hide toggle
  try {
    const hideBtn = page.getByRole("button", { name: /hide password/i });
    await hideBtn.hover();
  } catch (_) {}
  await wait(350);

  // Click to hide password again
  try {
    const hideBtn = page.getByRole("button", { name: /hide password/i });
    await hideBtn.click();
  } catch (_) {
    try {
      const input = page.getByPlaceholder("Password");
      const box = await input.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width - 16, box.y + box.height / 2);
      }
    } catch (_) {}
  }
  await wait(600);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
