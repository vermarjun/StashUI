// comp-67 — disabled textarea. The field is not interactive; we hover it to show the
// not-allowed cursor and the reduced-opacity state, then move away.
export default async function capture(page, { W, H, wait }) {
  await wait(500);

  // Hover over the disabled textarea to show the cursor state
  try {
    const textarea = page.locator('textarea[disabled], textarea:disabled');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    const box = await textarea.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
      await wait(700);
    }
  } catch {
    try {
      const textarea = page.locator('textarea').first();
      const box = await textarea.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
        await wait(700);
      }
    } catch { /* ignore */ }
  }

  // Move away to neutral position
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
