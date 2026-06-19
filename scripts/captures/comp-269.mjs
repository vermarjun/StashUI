/**
 * Choreography: comp-269
 * Static alert banner — error variant, neutral border, red icon inline.
 * Settle, hover over the alert, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move mouse to center of the alert banner
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // 3. Dwell on the alert
  try { await wait(2200); } catch (_) {}

  // 4. Small offset drift
  try {
    await page.mouse.move(W / 2 + 30, H / 2 - 5, { steps: 8 });
    await wait(800);
  } catch (_) {}
}
