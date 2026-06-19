/**
 * Capture choreography for comp-465
 * Pagination with "Go to page" input. Interactive: currentPage starts at 3,
 * totalPages = 10. Sequence: click page 4 → click page 5 → click Next → rest.
 */
export default async function choreograph({ page, W, H }) {
  // Allow React to mount and render pagination links
  await page.waitForTimeout(600);

  try {
    // Click page 4
    const page4 = page.getByRole('link', { name: '4' });
    await page4.waitFor({ state: 'visible', timeout: 4000 });
    await page4.click();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      // Fallback: click by text
      await page.locator('a:has-text("4")').first().click();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  try {
    // Click page 5
    const page5 = page.getByRole('link', { name: '5' });
    await page5.waitFor({ state: 'visible', timeout: 3000 });
    await page5.click();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      await page.locator('a:has-text("5")').first().click();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  try {
    // Click Next arrow
    const next = page.getByRole('link', { name: /next page/i });
    await next.waitFor({ state: 'visible', timeout: 3000 });
    await next.click();
    await page.waitForTimeout(700);
  } catch (err) {
    try {
      // Fallback: click right-chevron area (rightmost pagination link)
      await page.locator('nav a').last().click();
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // Return near start — hover the "Go to page" input
  try {
    const input = page.getByRole('textbox');
    await input.hover();
    await page.waitForTimeout(400);
    await page.mouse.move(W * 0.3, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {
    await page.mouse.move(W * 0.3, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  }
}
