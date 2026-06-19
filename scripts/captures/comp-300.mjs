/**
 * Choreography: comp-300
 * Custom toast trigger — clicks "Custom sonner" to fire a rich custom toast
 * with View / Undo actions, then dwells on it.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger
  try {
    await page.getByRole('button', { name: /custom sonner/i }).first().click({ timeout: 2500 });
    await wait(600);
  } catch (_) {
    try { await page.getByRole('button').first().click({ timeout: 2500 }); await wait(600); } catch (_) {}
  }

  // 3. Dwell on the custom toast
  try { await wait(1800); } catch (_) {}

  // 4. Hover the "View" action inside the toast
  try {
    await page.getByRole('button', { name: /view/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Final dwell
  try { await wait(800); } catch (_) {}
}
