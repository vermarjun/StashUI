/**
 * Choreography: comp-330
 * Change plan dialog — click "Change plan" button, dialog shows 3 radio plan cards
 * with features list. Switch plan selection, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /change plan/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog (Standard plan selected by default)
  try { await wait(1200); } catch (_) {}

  // 4. Click the "Essential" radio card
  try {
    await page.getByText('Essential').first().click();
    await wait(600);
  } catch (_) {}

  // 5. Click the "Enterprise" radio card
  try {
    await page.getByText('Enterprise').first().click();
    await wait(700);
  } catch (_) {}

  // 6. Dwell on the features list
  try { await wait(800); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
