/**
 * Capture choreography for comp-439
 * TYPE: TABS
 * Three horizontal tabs where each trigger has a badge count (3, 0, 7) stacked
 * above the label text. No icons. Compact max-w-xs centered list.
 * Sequence: dwell on Overview → click Projects → dwell → click Packages → dwell
 *           → click Overview → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const tabOverview = page.getByRole('tab', { name: /overview/i });
    await tabOverview.waitFor({ state: 'visible', timeout: 4000 });

    // Dwell on initial Overview tab (badge "3" visible above label)
    await page.mouse.move(cx, cy, { steps: 6 });
    await wait(600);

    // Click Projects (badge "0")
    const tabProjects = page.getByRole('tab', { name: /projects/i });
    await tabProjects.click();
    await wait(900);

    // Click Packages (badge "7")
    const tabPackages = page.getByRole('tab', { name: /packages/i });
    await tabPackages.click();
    await wait(900);

    // Return to Overview
    await tabOverview.click();
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
