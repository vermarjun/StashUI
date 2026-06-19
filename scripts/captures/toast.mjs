/**
 * Choreography: toast
 * Radix Toast primitives demo with "Show Toast" and "Show Error Toast" buttons.
 * Click both to show both toast variants.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(800); } catch (_) {}

  // 2. Click "Show Toast" (default variant)
  try {
    await page.getByRole('button', { name: /show toast/i }).first().click({ timeout: 2500 });
    await wait(1400);
  } catch (_) {
    try { await page.getByRole('button').first().click({ timeout: 2500 }); await wait(1400); } catch (_) {}
  }

  // 3. Click "Show Error Toast" (destructive variant)
  try {
    await page.getByRole('button', { name: /show error toast/i }).first().click({ timeout: 2500 });
    await wait(1600);
  } catch (_) {
    try { await page.getByRole('button').nth(1).click({ timeout: 2500 }); await wait(1600); } catch (_) {}
  }

  // 4. Hover the "Undo" action button to show interaction
  try {
    await page.getByRole('button', { name: /undo/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Final dwell on both toasts visible
  try { await wait(600); } catch (_) {}
}
