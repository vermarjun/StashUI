/**
 * Choreography: comp-306
 * Dark announcement banner with Download + Learn more buttons.
 * Static UI — settle, hover buttons, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Download" button
  try {
    await page.getByRole('button', { name: /download/i }).first().hover({ timeout: 2500 });
    await wait(900);
  } catch (_) {
    try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); await wait(900); } catch (_) {}
  }

  // 3. Hover "Learn more" button
  try {
    await page.getByRole('button', { name: /learn more/i }).first().hover({ timeout: 2500 });
    await wait(900);
  } catch (_) {}

  // 4. Hover close button briefly
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 5. Final dwell
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(800); } catch (_) {}
}
