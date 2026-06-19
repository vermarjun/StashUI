/**
 * Choreography: comp-303
 * Static dark banner with icon and "Upgrade" link.
 * Settle → hover the "Upgrade" link → dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Upgrade" link
  try {
    await page.getByRole('link', { name: /upgrade/i }).first().hover({ timeout: 2500 });
    await wait(1200);
  } catch (_) {}

  // 3. Move away and dwell
  try {
    await page.mouse.move(W / 2, H / 2 + 60, { steps: 10 });
    await wait(1400);
  } catch (_) {}

  // 4. Hover again
  try {
    await page.getByRole('link', { name: /upgrade/i }).first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}
}
