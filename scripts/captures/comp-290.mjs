/**
 * Choreography: comp-290
 * Error notification with title, description, and "Learn more" button.
 * Static card — settle, hover "Learn more" button, then close button.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move to card center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(800);
  } catch (_) {}

  // 3. Hover "Learn more" button
  try {
    await page.getByRole('button', { name: /learn more/i }).first().hover({ timeout: 2500 });
    await wait(1100);
  } catch (_) {}

  // 4. Hover close button (close button is inside the flex grow, use aria-label)
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
