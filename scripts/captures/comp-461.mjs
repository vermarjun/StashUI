/**
 * Capture choreography for comp-461
 * Type: PAGINATION — Joined button-group style: all page buttons share borders (negative-margin outline).
 * currentPage=3 of 10.
 * Sequence: dwell → hover page 2 → click page 4 → hover page 5 → click Next → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Wait for the joined pagination group
    const prevLink = page.getByRole("link", { name: /previous page/i });
    await prevLink.waitFor({ state: "visible", timeout: 4000 });

    // Hover page 2
    try {
      const page2 = page.getByRole("link", { name: "2" });
      await page2.hover();
      await wait(500);
    } catch (_) {}

    // Click page 4
    try {
      const page4 = page.getByRole("link", { name: "4" });
      await page4.click();
      await wait(700);
    } catch (_) {}

    // Hover page 5
    try {
      const page5 = page.getByRole("link", { name: "5" });
      await page5.hover();
      await wait(500);
    } catch (_) {}

    // Click Next
    const nextLink = page.getByRole("link", { name: /next page/i });
    await nextLink.hover();
    await wait(400);
    await nextLink.click();
    await wait(600);
  } catch (err) {
    try {
      const links = page.locator("nav a");
      const count = await links.count();
      if (count >= 3) {
        await links.nth(1).hover();
        await wait(500);
        await links.nth(3).click();
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
