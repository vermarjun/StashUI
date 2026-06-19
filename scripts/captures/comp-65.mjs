// comp-65 — textarea with muted gray background (bg-muted, border-transparent, shadow-none).
// Sequence: click textarea → type a comment → rest so the filled muted-bg textarea is visible.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    await page.keyboard.type('The subtle gray background makes this feel really clean.', { delay: 46 });
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('The subtle gray background makes this feel really clean.', { delay: 46 });
      await wait(600);
    } catch { /* ignore */ }
  }

  // Move mouse away
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 8 });
  } catch { /* ignore */ }
  await wait(350);
}
