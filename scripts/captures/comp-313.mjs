/**
 * Choreography: comp-313
 * Basic alert dialog — trigger: "Alert dialog" button
 * Dialog: "Are you sure?" with Cancel / Okay
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open alert dialog
  try {
    await page.getByRole('button', { name: /alert dialog/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog
  try { await wait(1500); } catch (_) {}

  // 4. Hover "Okay" action button briefly
  try {
    await page.getByRole('button', { name: /okay/i }).first().hover();
    await wait(600);
  } catch (_) {}

  // 5. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
