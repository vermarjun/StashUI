/**
 * Choreography: comp-311
 * Newsletter subscription banner — simple text with a "Subscribe" link.
 * Static UI — settle, hover the "Subscribe" link, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover "Subscribe" link
  try {
    await page.getByRole('link', { name: /subscribe/i }).first().hover({ timeout: 2500 });
    await wait(1800);
  } catch (_) {
    try { await page.mouse.move(W / 2, H * 0.3, { steps: 10 }); await wait(1800); } catch (_) {}
  }

  // 3. Move away and dwell
  try { await page.mouse.move(W / 2, H / 2, { steps: 8 }); } catch (_) {}
  try { await wait(1200); } catch (_) {}
}
