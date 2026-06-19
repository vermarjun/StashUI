/**
 * Choreography: comp-288
 * Success notification with icon + "Message sent" + "View" and "Undo" buttons + close.
 * Static card — settle, hover "View", then "Undo" to reveal underline hover states.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move to card center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(700);
  } catch (_) {}

  // 3. Hover "View" button
  try {
    await page.getByRole('button', { name: /view/i }).first().hover({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 4. Hover "Undo" button
  try {
    await page.getByRole('button', { name: /undo/i }).first().hover({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 5. Hover close button
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 6. Return to center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await wait(500);
  } catch (_) {}
}
