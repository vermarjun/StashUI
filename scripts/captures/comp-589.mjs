/**
 * Capture choreography for comp-589
 * Header with a breadcrumb made of two Select-trigger buttons ("Personal / Main project")
 * on the left, and a NavigationMenu (Dashboard, Docs, API reference) on the right.
 * Type: BREADCRUMB — open the first breadcrumb Select to show its dropdown, then open
 * the second Select.
 * Sequence: dwell → click first breadcrumb Select → dwell (dropdown open) → press Escape
 *           → click second breadcrumb Select → dwell → press Escape → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Click the first breadcrumb selector (account type — "Personal")
    const firstSelect = page.getByRole("button", { name: /personal/i }).first();
    await firstSelect.waitFor({ state: "visible", timeout: 4000 });
    await firstSelect.click();
    await wait(1200);

    // Hover first option to show highlight
    try {
      const teamOption = page.getByRole("option", { name: /team/i });
      await teamOption.hover();
      await wait(600);
    } catch (_) {}

    // Dismiss by pressing Escape
    await page.keyboard.press("Escape");
    await wait(700);

    // Click second breadcrumb selector (project — "Main project")
    try {
      const secondSelect = page
        .getByRole("button", { name: /main project/i })
        .first();
      await secondSelect.click();
      await wait(1200);

      // Hover second option
      try {
        const originOption = page.getByRole("option", {
          name: /origin project/i,
        });
        await originOption.hover();
        await wait(600);
      } catch (_) {}

      await page.keyboard.press("Escape");
      await wait(500);
    } catch (_) {}

    // Move mouse to neutral area
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
