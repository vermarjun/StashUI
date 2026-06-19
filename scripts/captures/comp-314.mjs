/**
 * Choreography: comp-314
 * Alert dialog with icon — trigger: "Alert dialog with icon" button
 * Dialog: icon + "Are you sure?" / delete account warning, Cancel / Confirm
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open alert dialog
  try {
    await page.getByRole('button', { name: /alert dialog with icon/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog (shows icon + warning)
  try { await wait(1500); } catch (_) {}

  // 4. Hover "Confirm" button
  try {
    await page.getByRole('button', { name: /confirm/i }).first().hover();
    await wait(600);
  } catch (_) {}

  // 5. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
