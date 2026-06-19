/**
 * Choreography: comp-388
 * Feedback popover — click "Feedback" button, popover opens with a textarea
 * and a "Send feedback" submit button.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Feedback" button
  try {
    await page.getByRole('button', { name: /feedback/i }).first().click();
    await wait(700);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(700); } catch (_) {}
  }

  // 3. Dwell on the open popover with textarea
  try { await wait(1000); } catch (_) {}

  // 4. Click into the textarea and type feedback
  try {
    const textarea = page.getByRole('textbox').first();
    await textarea.click();
    await wait(300);
    await page.keyboard.type('Great component library!', { delay: 60 });
    await wait(700);
  } catch (_) {}

  // 5. Hover the "Send feedback" button
  try {
    await page.getByRole('button', { name: /send feedback/i }).hover();
    await wait(600);
  } catch (_) {}

  // 6. Dwell
  try { await wait(600); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
