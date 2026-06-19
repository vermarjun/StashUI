// comp-80 — rounded-full (pill) button. Hover to show hover state, click once
// for active/pressed, move away to rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Hover the pill button
  try {
    await page.getByRole("button", { name: "Button" }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 10 });
    } catch { /* ignore */ }
  }
  await wait(700);

  // Click to show active state
  try {
    await page.getByRole("button", { name: "Button" }).click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2, H / 2);
    } catch { /* ignore */ }
  }
  await wait(400);

  // Move away to resting state
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
