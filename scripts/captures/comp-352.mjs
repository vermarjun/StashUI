/**
 * Choreography: comp-352
 * Accordion — Multi-level (accordion + nested collapsibles inside each item)
 * defaultValue="3" opens "Is coss ui optimized for performance?" which already
 * has a sub-collapsible open. Click item 1 to expand its nested items, then
 * click the first nested collapsible trigger to expand sub-content.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle — item 3 is pre-expanded with nested content visible
  try { await wait(700); } catch (_) {}

  // 2. Click first accordion header (item 1) to expand it
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 3. Dwell to see the nested collapsibles appear
  try { await wait(1000); } catch (_) {}

  // 4. Click the first nested collapsible trigger inside item 1
  try {
    // After opening item 1, there will be nested collapsible triggers
    // Target nth(1) which is the first nested sub-trigger
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell on expanded nested content
  try { await wait(1400); } catch (_) {}
}
