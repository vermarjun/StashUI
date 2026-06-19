/**
 * Capture choreography for comp-463
 * Type: PAGINATION — Data-table style: "Rows per page" Select left, "1-25 of 100" centre,
 * First / Previous / Next / Last chevron buttons right.
 * currentPage=1 of 4.
 * Sequence: open rows-per-page select → pick 50 → click Next → click Next → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Open the Rows per page select
    const rowsSelect = page.getByRole("combobox");
    await rowsSelect.waitFor({ state: "visible", timeout: 4000 });
    await rowsSelect.click();
    await wait(700);

    // Pick 50 rows
    try {
      const opt50 = page.getByRole("option", { name: "50" });
      await opt50.click();
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
      const links = page.locator("nav a");
      const count = await links.count();
      if (count >= 2) {
        await links.nth(2).click();
        await wait(650);
        await links.nth(2).click();
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
