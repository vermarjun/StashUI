/**
 * Choreography: comp-284
 * Error notification with icon + text + "Link" anchor + close button.
 * Static card — settle, hover the Link anchor, then close button.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move to card center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(700);
  } catch (_) {}

  // 3. Hover the "Link" anchor to show arrow translate animation
  try {
    await page.getByRole('link', { name: /link/i }).first().hover({ timeout: 2500 });
    await wait(1000);
  } catch (_) {}

  // 4. Hover close button
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Return to center and dwell
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await wait(600);
  } catch (_) {}
}
