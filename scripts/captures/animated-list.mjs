/**
 * Choreography: animated-list (magic-ui)
 * Items animate in one by one with spring animation — just wait and let them roll in.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle — first item appears
  try { await wait(800); } catch (_) {}

  // 2. Dwell as items animate in sequentially (~900ms each, 5 items)
  try { await wait(3000); } catch (_) {}

  // 3. Hover the list area to show item hover state
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await wait(500);
  } catch (_) {}

  // 4. Final dwell
  try { await wait(800); } catch (_) {}
}
