/**
 * Choreography: sonner
 * Toast trigger demo with 4 buttons: Show Toast, Success, Error, Promise.
 * Click multiple buttons to demonstrate the variety of Sonner toasts.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(800); } catch (_) {}

  // 2. Click "Show Toast" (default toast)
  try {
    await page.getByRole('button', { name: /show toast/i }).first().click({ timeout: 2500 });
    await wait(1200);
  } catch (_) {
    try { await page.getByRole('button').first().click({ timeout: 2500 }); await wait(1200); } catch (_) {}
  }

  // 3. Click "Success" toast
  try {
    await page.getByRole('button', { name: /success/i }).first().click({ timeout: 2500 });
    await wait(1000);
  } catch (_) {}

  // 4. Click "Error" toast
  try {
    await page.getByRole('button', { name: /error/i }).first().click({ timeout: 2500 });
    await wait(1000);
  } catch (_) {}

  // 5. Click "Promise" toast and dwell while it resolves
  try {
    await page.getByRole('button', { name: /promise/i }).first().click({ timeout: 2500 });
    await wait(2400);
  } catch (_) {}

  // 6. Final dwell on stacked toasts
  try { await wait(600); } catch (_) {}
}
