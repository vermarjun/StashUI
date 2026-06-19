/**
 * Choreography: multi-layout-accordion
 * Multi-open accordion — click questions to expand/collapse.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click first header
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell with item 1 open
  try { await wait(1200); } catch (_) {}

  // 4. Click second header (opens alongside first — multi mode)
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell with two items open
  try { await wait(1200); } catch (_) {}

  // 6. Click third header
  try {
    await page.getByRole('button').nth(2).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 7. Final dwell — all three open
  try { await wait(1000); } catch (_) {}
}
