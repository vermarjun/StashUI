// comp-83 — secondary button with XIcon on the left. Hover to show secondary
// hover state, click for pressed, move away to rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Hover the secondary button
  try {
    await page.getByRole("button", { name: /Button/i }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 10 });
    } catch { /* ignore */ }
  }
  await wait(700);

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
