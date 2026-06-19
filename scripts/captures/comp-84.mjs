// comp-84 — outline button with SparklesIcon on the right. Hover to show
// outline hover state (bg fills), click for pressed, move away to rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Approach from above for a clean hover entrance
  try {
    await page.mouse.move(W / 2, H / 2 - 40, { steps: 8 });
  } catch { /* ignore */ }
  await wait(200);

  // Hover the outline button
  try {
    await page.getByRole("button", { name: /Button/i }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(800);

  // Click to show active/pressed state
  try {
    await page.getByRole("button", { name: /Button/i }).click({ timeout: 1500 });
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
