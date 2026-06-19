/**
 * Choreography: comp-299
 * Toast trigger — clicks the "Show sonner" button to fire a basic toast,
 * dwells on the toast, then clicks again to stack a second one.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(800); } catch (_) {}

  // 2. Click trigger to show first toast
  try {
    await page.getByRole('button', { name: /show sonner/i }).first().click({ timeout: 2500 });
    await wait(600);
  } catch (_) {
    try { await page.getByRole('button').first().click({ timeout: 2500 }); await wait(600); } catch (_) {}
  }

  // 3. Dwell on toast
  try { await wait(1800); } catch (_) {}

  // 4. Click again to stack a second toast
  try {
    await page.getByRole('button', { name: /show sonner/i }).first().click({ timeout: 2500 });
    await wait(400);
  } catch (_) {}

  // 5. Final dwell
  try { await wait(1000); } catch (_) {}
}
