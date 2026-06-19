// comp-60 — required textarea with a red asterisk on the label and placeholder "Leave a message".
// Sequence: click textarea to focus → type a realistic message → rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const textarea = page.getByPlaceholder('Leave a message');
    await textarea.waitFor({ state: 'visible', timeout: 4000 });
    await textarea.click();
    await wait(250);
    await page.keyboard.type('Please reach out — I would love to connect about this opportunity.', { delay: 42 });
    await wait(600);
  } catch {
    try {
      await page.locator('textarea').first().click({ timeout: 3000 });
      await wait(250);
      await page.keyboard.type('Please reach out — I would love to connect.', { delay: 42 });
      await wait(600);
    } catch { /* ignore */ }
  }

  // Move mouse away
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 8 });
  } catch { /* ignore */ }
  await wait(350);
}
