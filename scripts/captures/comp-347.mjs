/**
 * Choreography: comp-347
 * Accordion — Tabs w/ left plus-minus (single collapsible)
 * defaultValue="3" so item 3 is pre-opened. Click item 1, then item 2.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Click first trigger (item 1) to expand
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on expanded item 1
  try { await wait(1200); } catch (_) {}

  // 4. Click second trigger (item 2)
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell on expanded item 2
  try { await wait(1200); } catch (_) {}
}
