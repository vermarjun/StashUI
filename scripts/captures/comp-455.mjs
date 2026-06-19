/**
 * Capture choreography for comp-455
 * Type: PAGINATION — Previous / Next ghost buttons spanning full width.
 * Sequence: dwell on initial state → click Next → dwell → click Next again → end near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const nextBtn = page.getByRole("button", { name: /next/i });
    await nextBtn.waitFor({ state: "visible", timeout: 4000 });

    // Dwell on initial state (page 3 of 10 — both buttons enabled)
    await nextBtn.hover();
    await wait(700);

    // Click Next once
    await nextBtn.click();
    await wait(600);

    // Click Next again
    await nextBtn.click();
    await wait(600);
  } catch (err) {
    try {
      const btns = page.getByRole("button");
      const count = await btns.count();
      if (count >= 2) {
        await btns.nth(1).hover();
        await wait(700);
        await btns.nth(1).click();
        await wait(600);
        await btns.nth(1).click();
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
