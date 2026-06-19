/**
 * Choreography: grid-layout-accordion
 * 2-column accordion grid. Click questions to open/close panels.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click first header (left column)
  try {
    const btn = page.getByRole('button').nth(0);
    await btn.click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on open panel
  try { await wait(1200); } catch (_) {}

  // 4. Click second header (left column)
  try {
    const btn = page.getByRole('button').nth(1);
    await btn.click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell
  try { await wait(1000); } catch (_) {}

  // 6. Click first header in right column (index 3)
  try {
    const btn = page.getByRole('button').nth(3);
    await btn.click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 7. Dwell
  try { await wait(1000); } catch (_) {}
}
