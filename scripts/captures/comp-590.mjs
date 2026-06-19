/**
 * Capture choreography for comp-590
 * Header with TeamSwitcher (left), icon-only NavigationMenu (Dashboard, Explore,
 * Write, Search icons — center), and Post button + notification + user menu (right).
 * Type: NAVIGATION-MENU — hover each icon nav link to reveal its title tooltip,
 * then hover the Post button.
 * Sequence: hover Dashboard icon → hover Explore icon → hover Write icon
 *           → hover Search icon → hover "Post" button → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Hover Dashboard icon link
    const dashboardLink = page.getByRole("link", { name: /dashboard/i }).first();
    await dashboardLink.waitFor({ state: "visible", timeout: 4000 });
    await dashboardLink.hover();
    await wait(700);

    // Hover Explore icon
    try {
      const exploreLink = page.getByRole("link", { name: /explore/i });
      await exploreLink.hover();
      await wait(700);
    } catch (_) {}

    // Hover Write icon
    try {
      const writeLink = page.getByRole("link", { name: /write/i });
      await writeLink.hover();
      await wait(700);
    } catch (_) {}

    // Hover Search icon
    try {
      const searchLink = page.getByRole("link", { name: /search/i });
      await searchLink.hover();
      await wait(700);
    } catch (_) {}

    // Hover "Post" button
    try {
      const postBtn = page.getByRole("button", { name: /post/i });
      await postBtn.hover();
      await wait(600);
    } catch (_) {}

    // Move mouse away
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
