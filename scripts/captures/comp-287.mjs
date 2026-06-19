/**
 * Choreography: comp-287
 * Success notification with icon + "You've made changes!" + "Undo" button + close.
 * Static card — settle, hover Undo button to reveal hover state.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move to card center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(700);
  } catch (_) {}

  // 3. Hover the "Undo" button
  try {
    await page.getByRole('button', { name: /undo/i }).first().hover({ timeout: 2500 });
    await wait(1100);
  } catch (_) {}

  // 4. Hover close button
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Return to center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await wait(600);
  } catch (_) {}
}
