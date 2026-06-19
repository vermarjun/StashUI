/**
 * Choreography: accordion (origin-ui base accordion primitive)
 * Simple 3-item accordion with defaultValue="2" pre-opened.
 * Click item 1 to expand, dwell, then click item 3.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Click first trigger (item 1) to expand it
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on expanded item 1
  try { await wait(1200); } catch (_) {}

  // 4. Click third trigger (item 3)
  try {
    await page.getByRole('button').nth(2).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell on expanded item 3
  try { await wait(1200); } catch (_) {}
}
