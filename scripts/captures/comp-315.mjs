/**
 * Choreography: comp-315
 * Scrollable dialog (native scrollbar) — trigger: "Scrollable (native scrollbar)" button
 * Dialog: FAQ content, Cancel / Okay footer
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /scrollable \(native scrollbar\)/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog top
  try { await wait(800); } catch (_) {}

  // 4. Scroll inside the dialog to reveal FAQ content
  try {
    await page.mouse.wheel(0, 220);
    await wait(600);
    await page.mouse.wheel(0, 220);
    await wait(600);
  } catch (_) {}

  // 5. Dwell at scrolled position
  try { await wait(700); } catch (_) {}

  // 6. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
