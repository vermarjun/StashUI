/**
 * Choreography: comp-343
 * Accordion w/ icon, sub-header, and plus-minus — 4 items with circle icon badges + subtitle, defaultValue="3" open.
 * Taller rows; height=620 in sidecar. Shows expand/collapse transitions.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle after mount
  try { await wait(700); } catch (_) {}

  // 2. Click first accordion header
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(650);
  } catch (_) {}

  // 3. Dwell on first item open (shows icon badge + expanded content)
  try { await wait(1300); } catch (_) {}

  // 4. Click second accordion header
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(650);
  } catch (_) {}

  // 5. Dwell on second item open
  try { await wait(1200); } catch (_) {}
}
