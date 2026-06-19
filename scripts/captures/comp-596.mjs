/**
 * Capture choreography for comp-596
 * Header with an underline-style NavigationMenu (Overview [active], Graphs, Backups)
 * on the left, status badges (Online / 99.9% / 45ms) and a power toggle Switch
 * on the right.
 * Type: TABS — the underline nav links behave like tabs (border-bottom indicator).
 * Sequence: hover "Graphs" tab → dwell → hover "Backups" tab → dwell → hover
 *           "Overview" tab → click power switch (toggle off) → dwell → click
 *           switch again (toggle on) → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Hover "Overview" (already active)
    const overviewLink = page.getByRole("link", { name: /overview/i }).first();
    await overviewLink.waitFor({ state: "visible", timeout: 4000 });
    await overviewLink.hover();
    await wait(700);

    // Hover "Graphs" tab
    try {
      const graphsLink = page.getByRole("link", { name: /graphs/i });
      await graphsLink.hover();
      await wait(800);
    } catch (_) {}

    // Hover "Backups" tab
    try {
      const backupsLink = page.getByRole("link", { name: /backups/i });
      await backupsLink.hover();
      await wait(800);
    } catch (_) {}

    // Move back to "Overview"
    try {
      await overviewLink.hover();
      await wait(600);
    } catch (_) {}

    // Click the power Switch to toggle off
    try {
      const powerSwitch = page.locator('button[role="switch"]').first();
      await powerSwitch.click();
      await wait(900);

      // Toggle back on
      await powerSwitch.click();
      await wait(900);
    } catch (_) {}

    // Move mouse away
    await page.mouse.move(cx, cy + 200, { steps: 12 });
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
