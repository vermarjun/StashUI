/**
 * Capture choreography for comp-459
 * Type: PAGINATION — Previous text + page number links + ellipsis + Next text.
 * currentPage=3 of 10, so pages [1,2,3,4,5] are shown with right ellipsis.
 * Sequence: dwell → click page 5 → dwell → click Next → dwell → click Next → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Wait for pagination to render
    const prevLink = page.getByRole("link", { name: /previous/i });
    await prevLink.waitFor({ state: "visible", timeout: 4000 });

    // Click page 5 link
    try {
      const page5 = page.getByRole("link", { name: "5" });
      await page5.click();
      await wait(600);
    } catch (_) {}

    // Click Next
    const nextLink = page.getByRole("link", { name: /next/i });
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
      if (count >= 3) {
        await links.nth(Math.floor(count / 2)).click();
        await wait(600);
        await links.last().click();
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
