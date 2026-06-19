/**
 * Choreography: expandable
 * Expandable card — click the trigger (chevron or "Show more") to expand,
 * revealing hidden content with a spring animation.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the expand trigger (chevron icon area or "Show more" text)
  try {
    // Try the role=button trigger first
    const trigger = page.getByRole('button', { name: /toggle expand/i }).first();
    await trigger.click({ timeout: 2500 });
    await wait(700);
  } catch (_) {
    try {
      // Fallback: click the first interactive element in the card header
      await page.getByRole('button').first().click({ timeout: 2500 });
      await wait(700);
    } catch (_) {}
  }

  // 3. Dwell on expanded state — content visible
  try { await wait(2000); } catch (_) {}

  // 4. Click "Show less" / trigger again to collapse
  try {
    const trigger = page.getByRole('button', { name: /toggle expand/i }).first();
    await trigger.click({ timeout: 2500 });
    await wait(600);
  } catch (_) {
    try {
      await page.getByRole('button').first().click({ timeout: 2500 });
      await wait(600);
    } catch (_) {}
  }

  // 5. Dwell on collapsed state
  try { await wait(800); } catch (_) {}
}
