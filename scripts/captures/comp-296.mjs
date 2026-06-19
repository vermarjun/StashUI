/**
 * Choreography: comp-296
 * Static live event reminder notification with "Notify me" button.
 * Settle → hover "Notify me" → dwell → hover close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Notify me" button
  try {
    await page.getByRole('button', { name: /notify me/i }).first().hover({ timeout: 2500 });
    await wait(1000);
  } catch (_) {}

  // 3. Dwell on notification
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(1200);
  } catch (_) {}

  // 4. Hover close (X) button
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}
}
