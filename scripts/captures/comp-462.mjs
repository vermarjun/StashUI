/**
 * Capture choreography for comp-462
 * Type: PAGINATION — Full-featured: "Page X of Y" label left, page number links + ellipsis centre,
 * results-per-page Select right.
 * currentPage=3 of 10.
 * Sequence: dwell → click page 5 → click Next → open per-page Select → pick 20 → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Wait for pagination
    const prevLink = page.getByRole("link", { name: /previous page/i });
    await prevLink.waitFor({ state: "visible", timeout: 4000 });

    // Click page 5
    try {
      const page5 = page.getByRole("link", { name: "5" });
      await page5.click();
      await wait(700);
    } catch (_) {}

    // Click Next
    const nextLink = page.getByRole("link", { name: /next page/i });
    await nextLink.hover();
    await wait(400);
    await nextLink.click();
    await wait(700);

    // Open the per-page select
    try {
      const selectTrigger = page.getByRole("combobox", { name: /results per page/i });
      await selectTrigger.click();
      await wait(700);

      // Pick "20 / page"
      const opt20 = page.getByRole("option", { name: /20/i });
      await opt20.click();
      await wait(500);
    } catch (_) {
      // Try locating the select trigger by its visible text
      try {
        const trigger = page.locator("[role=combobox]").first();
        await trigger.click();
        await wait(700);
        await page.getByRole("option").nth(1).click();
        await wait(500);
      } catch (_) {}
    }
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(800);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
