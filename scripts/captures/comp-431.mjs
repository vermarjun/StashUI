/**
 * Capture choreography for comp-431
 * TYPE: TABS
 * Three horizontal tabs (Tab 1, Tab 2, Tab 3) with a bottom-border underline
 * indicator on the active tab. No icons. Simple bordered pill style.
 * Sequence: dwell on Tab 1 → click Tab 2 → dwell → click Tab 3 → dwell → click Tab 1 → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Wait for the tab list to appear
    const tab1 = page.getByRole('tab', { name: /tab 1/i });
    await tab1.waitFor({ state: 'visible', timeout: 4000 });

    // Dwell on the initial active state (Tab 1)
    await page.mouse.move(cx, cy, { steps: 6 });
    await wait(600);

    // Click Tab 2
    const tab2 = page.getByRole('tab', { name: /tab 2/i });
    await tab2.click();
    await wait(900);

    // Click Tab 3
    const tab3 = page.getByRole('tab', { name: /tab 3/i });
    await tab3.click();
    await wait(900);

    // Return to Tab 1
    await tab1.click();
    await wait(700);

    // End near centre
    await page.mouse.move(cx, cy + 60, { steps: 8 });
    await wait(300);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 6 });
      await wait(500);
      await page.mouse.move(cx, cy + 60, { steps: 8 });
      await wait(300);
    } catch (_) {}
  }
}
