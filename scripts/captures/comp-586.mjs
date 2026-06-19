/**
 * Capture choreography for comp-586
 * Simple header bar: logo left, search input (with mic) center, nav buttons
 * ("Community", "Get Started") and theme toggle right.
 * Type: NAVIGATION-MENU — hover nav buttons to show hover state, then interact
 * with the search input.
 * Sequence: hover "Community" → hover "Get Started" → click search input → dwell → move away.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Hover the "Community" ghost button
    const communityBtn = page.getByRole("link", { name: /community/i });
    await communityBtn.waitFor({ state: "visible", timeout: 4000 });
    await communityBtn.hover();
    await wait(700);

    // Hover over "Get Started" button
    try {
      const getStartedBtn = page.getByRole("link", { name: /get started/i });
      await getStartedBtn.hover();
      await wait(700);
    } catch (_) {}

    // Click into the search input to show focus ring
    try {
      const searchInput = page.getByRole("searchbox");
      await searchInput.click();
      await wait(900);
    } catch (_) {
      try {
        const searchInput = page.locator('input[type="search"]');
        await searchInput.click();
        await wait(900);
      } catch (_) {}
    }

    // Move mouse away
    await page.mouse.move(cx, cy + 160, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(800);
      await page.mouse.move(cx, cy + 160, { steps: 10 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
