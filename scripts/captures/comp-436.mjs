/**
 * Capture choreography for comp-436
 * TYPE: TABS
 * Three horizontal "folder tab" style triggers (rounded-b-none, top border + side borders).
 * Bottom border line runs across the full width. Icons: House, PanelsTopLeft, Box.
 * Sequence: dwell on Overview → click Projects → dwell → click Packages → dwell
 *           → click Overview → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const tabOverview = page.getByRole('tab', { name: /overview/i });
    await tabOverview.waitFor({ state: 'visible', timeout: 4000 });

    // Dwell on initial Overview tab
    await page.mouse.move(cx, cy, { steps: 6 });
    await wait(600);

    // Click Projects
    const tabProjects = page.getByRole('tab', { name: /projects/i });
    await tabProjects.click();
    await wait(900);

    // Click Packages
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
