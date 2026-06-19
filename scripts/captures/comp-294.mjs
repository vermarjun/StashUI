/**
 * Choreography: comp-294
 * Static update available notification with Install/Later buttons.
 * Settle → hover Install → hover Later → dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Install" button
  try {
    await page.getByRole('button', { name: /install/i }).first().hover({ timeout: 2500 });
    await wait(900);
  } catch (_) {}

  // 3. Hover "Later" link-button
  try {
    await page.getByRole('button', { name: /later/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 4. Dwell on notification
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(1100);
  } catch (_) {}
}
