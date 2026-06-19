// comp-66 — compact textarea with rows=2 and min-h-0 (shorter than default).
// Sequence: click textarea → type a short comment that fits in 2 rows → rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    await page.keyboard.type('Compact and efficient — great for tight layouts.', { delay: 50 });
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('Compact and efficient — great for tight layouts.', { delay: 50 });
      await wait(600);
    } catch { /* ignore */ }
  }

  // Move mouse away
  try {
    await page.mouse.move(W / 2, H * 0.2, { steps: 8 });
  } catch { /* ignore */ }
  await wait(350);
}
