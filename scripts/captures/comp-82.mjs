// comp-82 — destructive button with TrashIcon on the left. Hover to reveal the
// red hover state, click for pressed, move away to rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Approach from the side to make the hover clearly visible
  try {
    await page.mouse.move(W / 2 - 80, H / 2, { steps: 10 });
  } catch { /* ignore */ }
  await wait(200);

  // Hover the destructive button
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
