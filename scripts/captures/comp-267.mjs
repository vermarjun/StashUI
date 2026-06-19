/**
 * Choreography: comp-267
 * Static alert banner — warning variant, neutral border, amber icon inline.
 * Settle, gentle hover over the alert, dwell.
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

  // 4. Move away slightly then back for a natural feel
  try {
    await page.mouse.move(W / 2 + 40, H / 2 - 10, { steps: 8 });
    await wait(800);
  } catch (_) {}
}
