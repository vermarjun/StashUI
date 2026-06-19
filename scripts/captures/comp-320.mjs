/**
 * Choreography: comp-320
 * Delete project confirmation dialog — trigger: "Delete project" button
 * Dialog: "Final confirmation" with input to type project name "coss-ui" before Delete enables
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /delete project/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog — Delete button is disabled
  try { await wait(900); } catch (_) {}

  // 4. Click the input and type project name to enable Delete
  try {
    const input = page.getByPlaceholder(/type coss-ui to confirm/i).first();
    await input.click();
    await wait(300);
    await page.keyboard.type('coss-ui', { delay: 80 });
    await wait(700);
  } catch (_) {
    try {
      await page.getByRole('textbox').first().click();
      await page.keyboard.type('coss-ui', { delay: 80 });
      await wait(700);
    } catch (_) {}
  }

  // 5. Dwell — Delete button now enabled
  try { await wait(700); } catch (_) {}

  // 6. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
