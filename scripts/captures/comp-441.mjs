/**
 * Capture choreography for comp-441
 * TYPE: TABS (vertical icon-only with right-side tooltips)
 * Three vertical icon-only tab triggers (House, PanelsTopLeft, Box) in a left-side
 * column. Tooltips appear to the right on hover. Projects has a floating badge "3".
 * Content panel fills the remaining width on the right.
 * Sequence: hover Overview icon (right tooltip) → click → hover Projects (tooltip + badge)
 *           → click → hover Packages → click → return to Overview → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const tablist = page.getByRole('tablist');
    await tablist.waitFor({ state: 'visible', timeout: 4000 });

    const tabs = page.getByRole('tab');

    // Hover first tab (Overview) — tooltip appears to the right
    await tabs.nth(0).hover();
    await wait(900);

    // Click Overview
    await tabs.nth(0).click();
    await wait(600);

    // Hover second tab (Projects) — tooltip + badge "3" to the right
    await tabs.nth(1).hover();
    await wait(900);

    // Click Projects
    await tabs.nth(1).click();
    await wait(700);

    // Hover third tab (Packages)
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
