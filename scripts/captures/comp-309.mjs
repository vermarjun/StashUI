/**
 * Choreography: comp-309
 * Dark banner with Rocket icon, title + description, "Try now" button.
 * Static UI — settle, hover button, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Try now" button
  try {
    await page.getByRole('button', { name: /try now/i }).first().hover({ timeout: 2500 });
    await wait(1400);
  } catch (_) {
    try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); await wait(1400); } catch (_) {}
  }

  // 3. Hover close button briefly
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 4. Final dwell
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(900); } catch (_) {}
}
