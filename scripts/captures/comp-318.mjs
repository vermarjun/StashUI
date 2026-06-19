/**
 * Choreography: comp-318
 * Scrollable dialog (sticky footer) — trigger: "Scrollable (sticky footer)" button
 * Dialog: FAQ content scrolls, sticky Cancel / Okay footer at bottom
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger button to open dialog
  try {
    await page.getByRole('button', { name: /scrollable \(sticky footer\)/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on open dialog top
  try { await wait(800); } catch (_) {}

  // 4. Scroll to show content scrolling while footer stays pinned
  try {
    await page.mouse.wheel(0, 220);
    await wait(600);
    await page.mouse.wheel(0, 220);
    await wait(700);
  } catch (_) {}

  // 5. Close with Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
