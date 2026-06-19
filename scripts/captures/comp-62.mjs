// comp-62 — textarea with inline "Optional" hint badge on the same row as the label.
// Sequence: click textarea → type a comment → rest so the label row + textarea are both visible.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    await page.keyboard.type('Loving the minimal aesthetic — keep it up!', { delay: 48 });
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('Loving the minimal aesthetic — keep it up!', { delay: 48 });
      await wait(600);
    } catch { /* ignore */ }
  }

  // Move mouse away to show the full component
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 8 });
  } catch { /* ignore */ }
  await wait(350);
}
