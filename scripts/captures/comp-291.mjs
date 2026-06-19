/**
 * Choreography: comp-291
 * Static success notification with "Learn more" button and close X.
 * Settle → hover "Learn more" → dwell → hover close button.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover the "Learn more" button
  try {
    await page.getByRole('button', { name: /learn more/i }).first().hover({ timeout: 2500 });
    await wait(900);
  } catch (_) {}

  // 3. Move away and dwell on the notification
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(1200);
  } catch (_) {}

  // 4. Hover the close (X) button briefly
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}
}
