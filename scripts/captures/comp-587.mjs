/**
 * Capture choreography for comp-587
 * Navigation header with centered icon+label links (Home/Inbox/Insights) and right-side search.
 * Sequence: hover Home (active) → hover Inbox → hover Insights → click search input → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Home" nav link (centered, active)
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

  // Hover "Inbox"
  try {
    const inbox = page.getByRole('link', { name: /^inbox$/i });
    await inbox.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.getByText('Inbox').first().hover();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Hover "Insights"
  try {
    const insights = page.getByRole('link', { name: /^insights$/i });
    await insights.hover();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.getByText('Insights').first().hover();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Click search input (right side) to show focus ring
  try {
    const search = page.getByRole('searchbox');
    await search.waitFor({ state: 'visible', timeout: 3000 });
    await search.click();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.locator('input[type="search"]').first().click();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Rest — move to logo area (left)
  try {
    await page.keyboard.press('Escape');
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
