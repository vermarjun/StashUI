/**
 * Choreography: comp-383
 * Bell icon button → popover with avatar-enhanced notification list.
 * Click to open, dwell, click "Mark all as read".
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

  // 3. Dwell on the open notification list with avatars
  try { await wait(1600); } catch (_) {}

  // 4. Hover first notification item
  try {
    const items = page.locator('[class*="rounded-md"][class*="hover:bg-accent"]');
    await items.first().hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Click "Mark all as read"
  try {
    await page.getByRole('button', { name: /mark all as read/i }).first().click({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 6. Final dwell
  try { await wait(600); } catch (_) {}
}
