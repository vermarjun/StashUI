/**
 * Choreography: comp-321
 * Newsletter subscribe dialog — trigger: "Newsletter" button
 * Dialog: "Never miss an update" with email input and Subscribe button
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /newsletter/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog
  try { await wait(900); } catch (_) {}

  // 4. Click email input and type a sample address
  try {
    const input = page.getByPlaceholder(/hi@yourcompany\.com/i).first();
    await input.click();
    await wait(300);
    await page.keyboard.type('hello@example.com', { delay: 60 });
    await wait(700);
  } catch (_) {
    try {
      await page.getByRole('textbox').first().click();
      await page.keyboard.type('hello@example.com', { delay: 60 });
      await wait(700);
    } catch (_) {}
  }

  // 5. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
