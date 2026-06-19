/**
 * Choreography: comp-312
 * Update banner with "Update now" button that shows a spinner for ~2s.
 * Click the button so the loading state is visible.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Click "Update now" to trigger loading state
  try {
    await page.getByRole('button', { name: /update now/i }).first().click({ timeout: 2500 });
    await wait(2200); // dwell on the spinner / "Updating..." state
  } catch (_) {
    try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); await wait(2200); } catch (_) {}
  }

  // 3. Button resets after 2s — dwell on the reset state
  try { await wait(800); } catch (_) {}
}
