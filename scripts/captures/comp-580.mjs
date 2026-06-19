/**
 * Capture choreography for comp-580
 * E-commerce nav header with Products/Categories/Deals links and a search bar.
 * Sequence: hover Products → hover Categories → hover Deals → click search bar → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Products"
  try {
    const products = page.getByRole('link', { name: /^products$/i });
    await products.waitFor({ state: 'visible', timeout: 4000 });
    await products.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Products').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Categories"
  try {
    const categories = page.getByRole('link', { name: /^categories$/i });
    await categories.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Categories').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Deals"
  try {
    const deals = page.getByRole('link', { name: /^deals$/i });
    await deals.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.getByText('Deals').first().hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Click search input to show focus state
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

  // Rest — move away from search
  try {
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
