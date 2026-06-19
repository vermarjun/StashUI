/**
 * Capture choreography for comp-456
 * Type: PAGINATION — Previous / Next icon-only outline buttons flanking "Page X of Y".
 * Sequence: hover Previous → dwell → hover Next → click Next → dwell → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const prevLink = page.getByRole("link", { name: /previous page/i });
    await prevLink.waitFor({ state: "visible", timeout: 4000 });

    // Hover Previous button briefly
    await prevLink.hover();
    await wait(600);

    // Move to Next button and click
    const nextLink = page.getByRole("link", { name: /next page/i });
    await nextLink.hover();
    await wait(500);
    await nextLink.click();
    await wait(700);

    // Click Next again
    await nextLink.click();
    await wait(600);
  } catch (err) {
    try {
      // Fallback: find links/buttons by position
      const links = page.locator("a");
      const count = await links.count();
      if (count >= 2) {
        await links.first().hover();
        await wait(600);
        await links.last().hover();
        await wait(500);
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
