/**
 * Choreography: liquid-glass-notification
 * Liquid glass notification cards — first card is expandable on hover.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle and let the component render
  try { await wait(900); } catch (_) {}

  // 2. Hover the first (expandable) notification card
  try {
    await page.mouse.move(W / 2, Math.round(H * 0.4), { steps: 12 });
    await wait(400);
  } catch (_) {}

  // 3. Dwell while card expands
  try { await wait(2000); } catch (_) {}

  // 4. Move away so card collapses
  try {
    await page.mouse.move(W / 2, Math.round(H * 0.1), { steps: 10 });
    await wait(800);
  } catch (_) {}

  // 5. Final dwell on collapsed state
  try { await wait(600); } catch (_) {}
}
