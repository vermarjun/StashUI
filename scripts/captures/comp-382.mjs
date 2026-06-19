/**
 * Choreography: comp-382
 * Bell icon button → popover with notification list + "Mark all as read".
 * Click to open, dwell on list, click "Mark all as read".
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(800); } catch (_) {}

  // 2. Click the bell button to open the popover
  try {
    await page.getByRole('button', { name: /open notifications/i }).first().click({ timeout: 2500 });
    await wait(600);
  } catch (_) {
    try { await page.getByRole('button').first().click({ timeout: 2500 }); await wait(600); } catch (_) {}
  }

  // 3. Dwell on the open notification list
  try { await wait(1400); } catch (_) {}

  // 4. Click "Mark all as read"
  try {
    await page.getByRole('button', { name: /mark all as read/i }).first().click({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 5. Dwell on the cleared state
  try { await wait(900); } catch (_) {}
}
