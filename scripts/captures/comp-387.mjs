/**
 * Choreography: comp-387
 * Share popover — click "Share" button, popover opens with social icon buttons
 * and a shareable link with a copy button.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Share" button
  try {
    await page.getByRole('button', { name: /share/i }).first().click();
    await wait(700);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(700); } catch (_) {}
  }

  // 3. Dwell on the open popover showing social icons and link
  try { await wait(1200); } catch (_) {}

  // 4. Hover the Twitter/X icon button
  try {
    await page.getByRole('button', { name: /twitter/i }).hover();
    await wait(500);
  } catch (_) {}

  // 5. Click the copy button to copy the link
  try {
    await page.getByRole('button', { name: /copy to clipboard/i }).click();
    await wait(800);
  } catch (_) {}

  // 6. Dwell on the copied check icon
  try { await wait(800); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
