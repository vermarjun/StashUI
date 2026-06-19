/**
 * Choreography: comp-293
 * Static cookie consent notification with Accept/Decline buttons.
 * Settle → hover Accept → dwell → hover Decline.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover Accept button
  try {
    await page.getByRole('button', { name: /accept/i }).first().hover({ timeout: 2500 });
    await wait(900);
  } catch (_) {}

  // 3. Hover Decline button
  try {
    await page.getByRole('button', { name: /decline/i }).first().hover({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 4. Move to center and dwell
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(1000);
  } catch (_) {}
}
