/**
 * Choreography: comp-295
 * Static avatar mention notification with Accept/Decline buttons.
 * Settle → hover author name link → hover Accept → hover Decline → dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Mary Palmer" link
  try {
    await page.getByRole('link', { name: /mary palmer/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 3. Hover Accept button
  try {
    await page.getByRole('button', { name: /accept/i }).first().hover({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 4. Hover Decline button
  try {
    await page.getByRole('button', { name: /decline/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Dwell
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(800);
  } catch (_) {}
}
