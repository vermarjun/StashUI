/**
 * Choreography: primitives-headless-disclosure
 * Three Headless UI Disclosure panels. Click each button to expand/collapse.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click first disclosure button
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on first panel open
  try { await wait(1300); } catch (_) {}

  // 4. Click second disclosure button
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell on second panel open (first may close — headless default is independent)
  try { await wait(1300); } catch (_) {}

  // 6. Click third disclosure button
  try {
    await page.getByRole('button').nth(2).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 7. Final dwell
  try { await wait(800); } catch (_) {}
}
