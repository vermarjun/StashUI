/**
 * Choreography: comp-302
 * Static dark announcement banner with arrow link.
 * Settle → hover the link → dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover the announcement link
  try {
    await page.getByRole('link').first().hover({ timeout: 2500 });
    await wait(1200);
  } catch (_) {}

  // 3. Move away and dwell
  try {
    await page.mouse.move(W / 2, H / 2 + 60, { steps: 10 });
    await wait(1600);
  } catch (_) {}

  // 4. Hover again to show arrow transition
  try {
    await page.getByRole('link').first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}
}
