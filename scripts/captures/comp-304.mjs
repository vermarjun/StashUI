/**
 * Choreography: comp-304
 * Static dark banner with icon and "Learn more" arrow link.
 * Settle → hover "Learn more" to show arrow slide → dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Learn more" link
  try {
    await page.getByRole('link', { name: /learn more/i }).first().hover({ timeout: 2500 });
    await wait(1200);
  } catch (_) {}

  // 3. Move away
  try {
    await page.mouse.move(W / 2, H / 2 + 60, { steps: 10 });
    await wait(1200);
  } catch (_) {}

  // 4. Hover again to replay arrow slide transition
  try {
    await page.getByRole('link', { name: /learn more/i }).first().hover({ timeout: 2500 });
    await wait(800);
  } catch (_) {}
}
