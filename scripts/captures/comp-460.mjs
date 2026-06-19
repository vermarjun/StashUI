/**
 * Capture choreography for comp-460
 * Type: PAGINATION — First / Previous / page numbers + ellipsis / Next / Last chevron buttons.
 * currentPage=3 of 10.
 * Sequence: dwell → hover First → click page 5 → click Next → click Next → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    const firstLink = page.getByRole("link", { name: /first page/i });
    await firstLink.waitFor({ state: "visible", timeout: 4000 });

    // Hover First button to show intent
    await firstLink.hover();
    await wait(600);

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

    // Click Next again
    await nextLink.click();
    await wait(600);
  } catch (err) {
    try {
      const links = page.locator("nav a");
      const count = await links.count();
      if (count >= 2) {
        await links.first().hover();
        await wait(600);
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
