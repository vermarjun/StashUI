/**
 * Capture choreography for comp-464
 * Type: PAGINATION — First / Previous / page-select dropdown / Next / Last.
 * currentPage=2 of 8.
 * Sequence: dwell → open page Select → pick page 5 → click Next → click Next → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Wait for pagination to render
    const firstLink = page.getByRole("link", { name: /first page/i });
    await firstLink.waitFor({ state: "visible", timeout: 4000 });

    // Open the page-select combobox
    const pageSelect = page.getByRole("combobox", { name: /select page/i });
    await pageSelect.click();
    await wait(700);

    // Pick page 5
    try {
      const opt5 = page.getByRole("option", { name: /page 5/i });
      await opt5.click();
      await wait(600);
    } catch (_) {
      await page.keyboard.press("Escape");
      await wait(300);
    }

    // Click Next
    const nextLink = page.getByRole("link", { name: /next page/i });
    await nextLink.hover();
    await wait(400);
    await nextLink.click();
    await wait(700);

    // Click Next again
    await nextLink.click();
    await wait(600);
  } catch (err) {
    try {
      // Fallback: find links by aria-label pattern
      const links = page.locator("a[aria-label]");
      const count = await links.count();
      if (count >= 2) {
        await links.nth(Math.floor(count / 2)).click();
        await wait(650);
        await links.last().click();
        await wait(600);
      }
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
