/**
 * Capture choreography for comp-437
 * TYPE: TABS
 * Six horizontal underline tabs with icons and badges (Overview, Projects[3], Packages[New],
 * Team, Insights, Settings). Scrollable. Bottom border bar spans full width.
 * Sequence: dwell on Overview → click Projects → dwell → click Packages → dwell
 *           → click Team → dwell → click Overview → rest.
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

    // Click Projects (has badge "3")
    const tabProjects = page.getByRole('tab', { name: /projects/i });
    await tabProjects.click();
    await wait(800);

    // Click Packages (has badge "New")
    const tabPackages = page.getByRole('tab', { name: /packages/i });
    await tabPackages.click();
    await wait(800);

    // Click Team
    const tabTeam = page.getByRole('tab', { name: /team/i });
    await tabTeam.click();
    await wait(800);

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
