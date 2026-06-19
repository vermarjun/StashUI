// comp-61 — textarea with helper text below ("Please add as many details as you can").
// Sequence: click textarea → type a detailed comment → move away so helper text stays visible.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    await page.keyboard.type('Really enjoyed using this — the onboarding flow felt intuitive and the UI is polished.', { delay: 40 });
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('Really enjoyed using this — the onboarding flow felt intuitive.', { delay: 40 });
      await wait(600);
    } catch { /* ignore */ }
  }

  // Move mouse away so helper text is visible
  try {
    await page.mouse.move(W / 2, H * 0.9, { steps: 8 });
  } catch { /* ignore */ }
  await wait(350);
}
