/**
 * Capture choreography for comp-588
 * Header with icon+label NavigationMenu links (Home, Inbox, Insights) on the left,
 * centered logo, and Upgrade button + UserMenu on the right.
 * Type: NAVIGATION-MENU — hover each nav link so the active/hover style shows.
 * Sequence: hover "Home" → hover "Inbox" → hover "Insights" → hover "Upgrade" → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Hover nav link "Home"
    const homeLink = page.getByRole("link", { name: /home/i }).first();
    await homeLink.waitFor({ state: "visible", timeout: 4000 });
    await homeLink.hover();
    await wait(700);

    // Hover "Inbox"
    try {
      const inboxLink = page.getByRole("link", { name: /inbox/i });
      await inboxLink.hover();
      await wait(700);
    } catch (_) {}

    // Hover "Insights"
    try {
      const insightsLink = page.getByRole("link", { name: /insights/i });
      await insightsLink.hover();
      await wait(700);
    } catch (_) {}

    // Hover "Upgrade" button
    try {
      const upgradeBtn = page.getByRole("button", { name: /upgrade/i });
      await upgradeBtn.hover();
      await wait(600);
    } catch (_) {}

    // Move mouse away to neutral area
    await page.mouse.move(cx, cy + 200, { steps: 14 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(800);
      await page.mouse.move(cx, cy + 200, { steps: 10 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
