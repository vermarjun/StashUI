/**
 * Choreography: comp-280
 * Error notification with inline icon + text + close button.
 * Static card — settle, hover card center, hover close button briefly.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move to card center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(900);
  } catch (_) {}

  // 3. Hover the close button
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(900);
  } catch (_) {}

  // 4. Move away and dwell
  try {
    await page.mouse.move(W / 2, H / 2 + 40, { steps: 8 });
    await wait(800);
  } catch (_) {}
}
