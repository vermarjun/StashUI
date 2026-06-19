// comp-79 — disabled button. The button is not interactive; hover over it to
// show the cursor:not-allowed state, pause, then move away.
export default async function capture(page, { W, H, wait }) {
  await wait(500);

  // Move toward the button slowly to highlight it
  try {
    await page.mouse.move(W / 2 - 60, H / 2 + 30, { steps: 12 });
  } catch { /* ignore */ }
  await wait(400);

  try {
    await page.getByRole("button", { name: "Button" }).hover({
      timeout: 1500,
      force: true,
    });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(900);

  // Attempt click — should have no effect on a disabled button
  try {
    await page.mouse.click(W / 2, H / 2);
  } catch { /* ignore */ }
  await wait(500);

  // Drift away to resting state
  try {
    await page.mouse.move(W / 2, H * 0.78, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
