/**
 * Choreography: comp-305
 * Dark announcement banner with close button and "Learn more" link.
 * Static UI — settle, hover the "Learn more" link, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover over the "Learn more" link to trigger arrow animation
  try {
    await page.getByRole('link', { name: /learn more/i }).first().hover({ timeout: 2500 });
    await wait(1200);
  } catch (_) {
    try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); await wait(1200); } catch (_) {}
  }

  // 3. Hover the close button briefly
  try {
    await page.getByRole('button', { name: /close/i }).first().hover({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 4. Move away and dwell
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(1000); } catch (_) {}
}
