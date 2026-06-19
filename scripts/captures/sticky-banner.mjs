/**
 * Choreography: sticky-banner
 * Banner that sticks at top — show it entering, then scroll to demonstrate sticky behavior.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle and let banner animate in
  try { await wait(900); } catch (_) {}

  // 2. Scroll down slowly to demonstrate sticky behavior
  try {
    await page.mouse.wheel(0, Math.round(H * 0.4));
    await wait(600);
  } catch (_) {}

  try {
    await page.mouse.wheel(0, Math.round(H * 0.4));
    await wait(600);
  } catch (_) {}

  // 3. Dwell with banner visible at top while content scrolled
  try { await wait(1200); } catch (_) {}

  // 4. Hover the CTA link
  try {
    await page.getByRole('link').first().hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Scroll back to top for clean loop
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(700);
  } catch (_) {}
}
