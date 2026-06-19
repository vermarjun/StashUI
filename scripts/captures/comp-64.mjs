// comp-64 — textarea in error state. Has aria-invalid, defaultValue "Hello!", and a
// destructive red error message below ("Message should be at least 10 characters").
// The error is static — no interaction needed to trigger it. We click the textarea
// to show the focus ring on the error border, then move away so both states are clear.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Click the textarea to show focus on the error-styled border
  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(400);
    // Select all existing text and show it
    await page.keyboard.press('End');
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(500);
    } catch { /* ignore */ }
  }

  // Click away so the full component (textarea + error message) is visible without focus
  try {
    await page.mouse.click(W / 2, H * 0.1);
    await wait(400);
  } catch { /* ignore */ }

  // Rest at top so error message below textarea is fully in frame
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 6 });
  } catch { /* ignore */ }
  await wait(350);
}
