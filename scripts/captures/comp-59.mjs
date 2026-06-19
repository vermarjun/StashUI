// comp-59 — simple textarea with label "Simple textarea" and placeholder "Leave a comment".
// Sequence: click textarea to focus → type a realistic multi-word comment → rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a comment');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    await page.keyboard.type('The design is clean and easy to navigate.', { delay: 45 });
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('The design is clean and easy to navigate.', { delay: 45 });
      await wait(600);
    } catch { /* ignore */ }
  }

  // Move mouse away from field
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 8 });
  } catch { /* ignore */ }
  await wait(350);
}
