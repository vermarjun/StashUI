/**
 * Capture choreography for comp-440
 * TYPE: TABS (horizontal icon-only with tooltips)
 * Three horizontal icon-only tab triggers (House, PanelsTopLeft, Box) with tooltip
 * labels ("Overview", "Projects", "Packages") on hover. Projects has a floating
 * badge count ("3"). Horizontal orientation.
 * Sequence: hover Overview icon (tooltip appears) → click it → hover Projects icon
 *           (tooltip + badge) → click it → dwell → hover Packages → click → dwell
 *           → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Locate tabs by role; icon-only tabs have no accessible name from label text,
    // so we try finding them within the tablist by index or aria-label fallback.
    const tablist = page.getByRole('tablist');
    await tablist.waitFor({ state: 'visible', timeout: 4000 });

    const tabs = page.getByRole('tab');

    // Hover first tab (Overview) to show tooltip
    await tabs.nth(0).hover();
    await wait(900);

    // Click Overview tab
    await tabs.nth(0).click();
    await wait(600);

    // Hover second tab (Projects) to show tooltip + badge
    await tabs.nth(1).hover();
    await wait(900);

    // Click Projects tab
    await tabs.nth(1).click();
    await wait(700);

    // Hover third tab (Packages) to show tooltip
    await tabs.nth(2).hover();
    await wait(800);

    // Click Packages
    await tabs.nth(2).click();
    await wait(700);

    // Return to Overview
    await tabs.nth(0).hover();
    await wait(500);
    await tabs.nth(0).click();
    await wait(500);

    // End near centre
    await page.mouse.move(cx, cy + 80, { steps: 8 });
    await wait(300);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 6 });
      await wait(500);
      await page.mouse.move(cx, cy + 80, { steps: 8 });
      await wait(300);
    } catch (_) {}
  }
}
