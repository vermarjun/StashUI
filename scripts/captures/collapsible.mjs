/**
 * Choreography: collapsible (origin-ui base collapsible primitive)
 * Single expandable section — click the trigger to expand, dwell, then collapse.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Click the trigger to expand
  try {
    await page.getByRole('button').first().click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on expanded content — this is the payoff
  try { await wait(2000); } catch (_) {}

  // 4. Click trigger again to collapse
  try {
    await page.getByRole('button').first().click({ timeout: 2500 });
    await wait(500);
  } catch (_) {}
}
