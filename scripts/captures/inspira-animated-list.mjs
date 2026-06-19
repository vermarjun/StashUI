/**
 * Choreography: inspira-animated-list (inspira-react/animated-list)
 * Rolling notification list — items animate in, then cycle. Just dwell and watch.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle — first items begin appearing (delay=1500ms each)
  try { await wait(800); } catch (_) {}

  // 2. Dwell as items populate (5 items × 1500ms ≈ 7.5s, capture just needs 4-6s)
  try { await wait(3500); } catch (_) {}

  // 3. Hover a notification card to show hover scale effect
  try {
    await page.mouse.move(W / 2, Math.round(H * 0.45), { steps: 10 });
    await wait(600);
  } catch (_) {}

  // 4. Final dwell
  try { await wait(700); } catch (_) {}
}
