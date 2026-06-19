/**
 * Choreography: comp-327
 * Invite members dialog — click "Invite members" button, dialog shows email inputs
 * and a magic link field with a copy button.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /invite members/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog
  try { await wait(1200); } catch (_) {}

  // 4. Click "+ Add another" to add a third email field
  try {
    await page.getByText('+ Add another').click();
    await wait(600);
  } catch (_) {}

  // 5. Click the copy button on the magic link
  try {
    await page.getByRole('button', { name: /copy to clipboard/i }).click();
    await wait(800);
  } catch (_) {}

  // 6. Dwell on the copied state
  try { await wait(700); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
