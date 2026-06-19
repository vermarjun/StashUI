/**
 * Capture choreography for comp-579
 * Flat navigation header with underline active-indicator on "Home".
 * Sequence: dwell on header → hover Features → hover Pricing → hover About → hover Home (active) → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Features" nav link
  try {
    const features = page.getByRole('link', { name: /^features$/i });
    await features.waitFor({ state: 'visible', timeout: 4000 });
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

  // Hover "Home" (active, shows border-b underline)
  try {
    const home = page.getByRole('link', { name: /^home$/i });
    await home.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Home').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Rest — move to logo area
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
