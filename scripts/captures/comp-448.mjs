/**
 * Capture choreography for comp-448
 * Type: BREADCRUMB — Home icon > Components > Breadcrumb (current page).
 * Sequence: dwell → hover Home icon → move to "Components" link → dwell → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Hover the Home icon link
    const homeLink = page.getByRole("link", { name: /home/i });
    await homeLink.waitFor({ state: "visible", timeout: 4000 });
    await homeLink.hover();
    await wait(700);

    // Move to Components link
    const componentsLink = page.getByRole("link", { name: /components/i });
    await componentsLink.hover();
    await wait(900);

    // Move toward current page text
    await page.mouse.move(cx + 60, cy, { steps: 10 });
    await wait(500);
  } catch (err) {
    try {
      // Fallback: sweep across breadcrumb area
      await page.mouse.move(cx - 120, cy, { steps: 6 });
      await wait(600);
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(700);
      await page.mouse.move(cx + 80, cy, { steps: 8 });
      await wait(500);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
