/**
 * Choreography: comp-353
 * Accordion — Multi-level w/ icon (accordion + nested collapsibles, icons on items)
 * defaultValue="3" opens "Is coss ui optimized for performance?" which has a
 * sub-collapsible pre-opened. Click item 1, then expand its first sub-collapsible.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle — item 3 is pre-expanded with a nested sub-item visible
  try { await wait(700); } catch (_) {}

  // 2. Click first accordion header (item 1) to expand
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 3. Dwell to see nested collapsibles appear
  try { await wait(1000); } catch (_) {}

  // 4. Click the first nested collapsible trigger inside item 1
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell on expanded nested content with icon
  try { await wait(1400); } catch (_) {}
}
