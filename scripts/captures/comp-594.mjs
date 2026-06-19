/**
 * Capture choreography for comp-594
 * Header with TeamSwitcher (left), AppToggle radio group "Sitemap / Wireframe" (center),
 * and Export + Upgrade buttons (right).
 * Type: TABS — the AppToggle is a two-option radio toggle (Sitemap / Wireframe).
 * Sequence: click "Sitemap" radio label → dwell → click "Wireframe" radio label
 *           → dwell → click "Sitemap" again → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Click "Sitemap" label (first option) to toggle to that state
    const sitemapLabel = page.getByText(/sitemap/i).first();
    await sitemapLabel.waitFor({ state: "visible", timeout: 4000 });
    await sitemapLabel.click();
    await wait(900);

    // Click "Wireframe" label (second option)
    try {
      const wireframeLabel = page.getByText(/wireframe/i).first();
      await wireframeLabel.click();
      await wait(900);
    } catch (_) {}

    // Toggle back to "Sitemap"
    try {
      const sitemapLabel2 = page.getByText(/sitemap/i).first();
      await sitemapLabel2.click();
      await wait(900);
    } catch (_) {}

    // Hover the "Upgrade" button
    try {
      const upgradeBtn = page.getByRole("button", { name: /upgrade/i });
      await upgradeBtn.hover();
      await wait(600);
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
