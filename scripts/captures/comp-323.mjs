/**
 * Choreography: comp-323
 * Rating feedback dialog — trigger: "Rating" button
 * Dialog: "Help us improve" — radio 0-8 difficulty scale + textarea + Send feedback
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /^rating$/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog showing the rating scale
  try { await wait(900); } catch (_) {}

  // 4. Click radio option "3" on the difficulty scale
  try {
    const radio3 = page.locator('label').filter({ hasText: /^3$/ }).first();
    await radio3.click();
    await wait(500);
  } catch (_) {
    try {
      // Fallback: click a radio by value
      await page.locator('input[type="radio"][value="3"]').first().click({ force: true });
      await wait(500);
    } catch (_) {}
  }

  // 5. Click the textarea and type a short comment
  try {
    const textarea = page.locator('textarea').first();
    await textarea.click();
    await wait(300);
    await page.keyboard.type('Smooth onboarding experience.', { delay: 55 });
    await wait(600);
  } catch (_) {}

  // 6. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
