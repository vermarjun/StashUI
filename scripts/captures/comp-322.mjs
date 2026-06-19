/**
 * Choreography: comp-322
 * Feedback dialog — trigger: "Feedback" button
 * Dialog: "Send us feedback" with textarea and Send feedback button
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /^feedback$/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog
  try { await wait(900); } catch (_) {}

  // 4. Click textarea and type a short feedback message
  try {
    const textarea = page.getByPlaceholder(/how can we improve/i).first();
    await textarea.click();
    await wait(300);
    await page.keyboard.type('Great component library!', { delay: 55 });
    await wait(700);
  } catch (_) {
    try {
      await page.locator('textarea').first().click();
      await page.keyboard.type('Great component library!', { delay: 55 });
      await wait(700);
    } catch (_) {}
  }

  // 5. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
