/**
 * Choreography: comp-381
 * Filter popover — click the filter icon button, popover opens with checkboxes
 * for Real Time / Top Channels / Last Orders / Total Spent. Toggle some, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the filter icon button (aria-label="Filters")
  try {
    await page.getByRole('button', { name: /filters/i }).first().click();
    await wait(700);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(700); } catch (_) {}
  }

  // 3. Dwell on the open popover with checkboxes
  try { await wait(1000); } catch (_) {}

  // 4. Check "Real Time"
  try {
    await page.getByLabel('Real Time').click();
    await wait(500);
  } catch (_) {
    try {
      const checkboxes = page.getByRole('checkbox');
      await checkboxes.nth(0).click();
      await wait(500);
    } catch (_) {}
  }

  // 5. Check "Top Channels"
  try {
    await page.getByLabel('Top Channels').click();
    await wait(500);
  } catch (_) {
    try {
      const checkboxes = page.getByRole('checkbox');
      await checkboxes.nth(1).click();
      await wait(500);
    } catch (_) {}
  }

  // 6. Dwell on the checked state
  try { await wait(800); } catch (_) {}

  // 7. Click "Apply" button
  try {
    await page.getByRole('button', { name: /apply/i }).click();
    await wait(500);
  } catch (_) {}

  // 8. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
