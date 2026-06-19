/**
 * Choreography: single-layout-accordion
 * Single-open accordion (custom Plus icon). Click to open one at a time.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle — items 1 & 2 open by default
  try { await wait(700); } catch (_) {}

  // 2. Click item 3 to open it
  try {
    await page.getByRole('button').nth(2).click({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 3. Dwell on item 3 open
  try { await wait(1200); } catch (_) {}

  // 4. Click item 1 to toggle
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Dwell
  try { await wait(1200); } catch (_) {}

  // 6. Click item 2
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 7. Dwell
  try { await wait(800); } catch (_) {}
}
