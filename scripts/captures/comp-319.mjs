/**
 * Choreography: comp-319
 * Terms & Conditions dialog — trigger: "Terms & Conditions" button
 * Dialog: scrollable T&C content; "I agree" button unlocks only after scrolling to bottom
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /terms & conditions/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog — shows "I agree" is disabled + hint message
  try { await wait(900); } catch (_) {}

  // 4. Scroll the content area to the bottom to unlock "I agree"
  try {
    await page.mouse.wheel(0, 300);
    await wait(500);
    await page.mouse.wheel(0, 300);
    await wait(500);
    await page.mouse.wheel(0, 300);
    await wait(600);
  } catch (_) {}

  // 5. Dwell — "I agree" is now enabled
  try { await wait(800); } catch (_) {}

  // 6. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
