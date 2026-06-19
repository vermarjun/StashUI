/**
 * Capture choreography for comp-584
 * Two-row navigation header: top row has logo/search/notification/user;
 * bottom row has Home/Features/Pricing/About links.
 * Sequence: hover Home (active) → hover Features → hover Pricing → hover About → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Home" link in bottom nav (active)
  try {
    const home = page.getByRole('link', { name: /^home$/i });
    await home.waitFor({ state: 'visible', timeout: 4000 });
    await home.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Home').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Features"
  try {
    const features = page.getByRole('link', { name: /^features$/i });
    await features.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Features').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Pricing"
  try {
    const pricing = page.getByRole('link', { name: /^pricing$/i });
    await pricing.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Pricing').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "About"
  try {
    const about = page.getByRole('link', { name: /^about$/i });
    await about.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('About').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Rest — move to search input area on top row
  try {
    const search = page.getByRole('searchbox');
    await search.hover();
    await page.waitForTimeout(400);
    await page.mouse.move(W * 0.1, H * 0.08, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {
    await page.mouse.move(W * 0.1, H * 0.08, { steps: 10 });
    await page.waitForTimeout(300);
  }
}
