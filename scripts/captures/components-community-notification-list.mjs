/**
 * Choreography: components-community-notification-list (animate-ui)
 * Stacked notification cards — collapsed by default, expands on hover to show all.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle showing collapsed stack
  try { await wait(900); } catch (_) {}

  // 2. Dwell on collapsed state
  try { await wait(800); } catch (_) {}

  // 3. Hover the notification list to trigger expand animation
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await wait(400);
  } catch (_) {}

  // 4. Dwell in expanded state (shows all 3 notifications + "View all")
  try { await wait(2200); } catch (_) {}

  // 5. Move away to collapse
  try {
    await page.mouse.move(W / 2, Math.round(H * 0.1), { steps: 10 });
    await wait(700);
  } catch (_) {}

  // 6. Final dwell collapsed
  try { await wait(500); } catch (_) {}
}
