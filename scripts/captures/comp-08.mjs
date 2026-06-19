// comp-08 — disabled email input. The field cannot be focused. Hover over the
// input to reveal the not-allowed cursor, then move away — the disabled
// opacity and placeholder are the key visual signals.
export default async function capture(page, { W, H, wait }) {
  await wait(500);

  // Hover over the disabled input to show the not-allowed cursor
  try {
    await page.locator("input[disabled], input").first().hover({ timeout: 2000 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 10 });
    } catch { /* ignore */ }
  }
  await wait(800);

  // Move cursor away to resting state
  try {
    await page.mouse.move(W / 2, H * 0.78, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
