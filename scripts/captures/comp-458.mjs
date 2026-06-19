/**
 * Capture choreography for comp-458
 * Type: PAGINATION — "Page X of Y" label on the left; Previous / Next outline buttons on the right.
 * Sequence: dwell → hover Previous → hover Next → click Next → dwell → click Next again → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const prevBtn = page.getByRole("link", { name: /previous/i });
    await prevBtn.waitFor({ state: "visible", timeout: 4000 });

    await prevBtn.hover();
    await wait(600);

    const nextBtn = page.getByRole("link", { name: /next/i });
    await nextBtn.hover();
    await wait(500);
    await nextBtn.click();
    await wait(700);

    await nextBtn.click();
    await wait(600);
  } catch (err) {
    try {
      // Fallback: use button/link by text
      const prev = page.getByText("Previous").first();
      await prev.hover();
      await wait(600);
      const next = page.getByText("Next").first();
      await next.hover();
      await wait(500);
      await next.click();
      await wait(650);
      await next.click();
      await wait(600);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
