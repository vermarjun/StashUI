/**
 * Choreography: comp-344
 * Accordion "tabs" w/ chevron — card-bordered items with rounded corners, defaultValue="3" open.
 * Shows: open item 1 (collapses item 3) → dwell → open item 2 (collapses item 1) → dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle after mount
  try { await wait(700); } catch (_) {}

  // 2. Click first tab-style accordion header
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on first item open
  try { await wait(1200); } catch (_) {}

  // 4. Click second tab-style accordion header
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell on second item open
  try { await wait(1200); } catch (_) {}
}
