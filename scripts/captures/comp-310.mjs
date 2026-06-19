/**
 * Choreography: comp-310
 * Black Friday sale banner with live countdown timer + "Buy now" button.
 * Static UI — settle, hover button, dwell on the ticking timer.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle — let timer tick
  try { await wait(800); } catch (_) {}

  // 2. Hover "Buy now" button
  try {
    await page.getByRole('button', { name: /buy now/i }).first().hover({ timeout: 2500 });
    await wait(1200);
  } catch (_) {
    try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); await wait(1200); } catch (_) {}
  }

  // 3. Move to countdown area to show it's live
  try { await page.mouse.move(W * 0.6, H * 0.3, { steps: 10 }); } catch (_) {}
  try { await wait(1200); } catch (_) {}

  // 4. Hover close button briefly
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Final dwell
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(700); } catch (_) {}
}
