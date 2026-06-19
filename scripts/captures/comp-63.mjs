// comp-63 — textarea with custom indigo focus ring (--ring overridden via CSS var).
// The indigo ring is only visible on focus, so we must keep the textarea focused
// throughout the recording.
// Sequence: click textarea → type text → pause with focus active → rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    // Type slowly so the indigo ring is visible for a while
    await page.keyboard.type('Great component — the indigo ring is a nice touch.', { delay: 50 });
    await wait(800);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('Great component — the indigo ring is a nice touch.', { delay: 50 });
      await wait(800);
    } catch { /* ignore */ }
  }

  // End near start (keep focus active — don't click away)
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
  } catch { /* ignore */ }
  await wait(300);
}
