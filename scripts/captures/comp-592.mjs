/**
 * Capture choreography for comp-592
 * Header with search input (left), "Test mode" label + Switch, layout/info/
 * notification/settings icon buttons, and a circular "+" Add button (right).
 * Type: NAVIGATION-MENU — click the search input then toggle the Test mode switch.
 * Sequence: click search input → dwell → click Test mode switch (toggle off)
 *           → dwell → click switch again (toggle on) → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Click the search input
    const searchInput = page.getByRole("searchbox").first();
    await searchInput.waitFor({ state: "visible", timeout: 4000 });
    await searchInput.click();
    await wait(800);

    // Blur the search input
    await page.keyboard.press("Escape");
    await wait(400);

    // Click the Test mode switch to toggle it off
    try {
      const switchEl = page.getByRole("switch", { name: /toggle switch/i });
      await switchEl.waitFor({ state: "visible", timeout: 3000 });
      await switchEl.click();
      await wait(900);

      // Toggle it back on
      await switchEl.click();
      await wait(900);
    } catch (_) {
      try {
        const switchEl = page.locator('button[role="switch"]').first();
        await switchEl.click();
        await wait(900);
        await switchEl.click();
        await wait(900);
      } catch (_) {}
    }

    // Hover the add button
    try {
      const addBtn = page.getByRole("button", { name: /add new item/i });
      await addBtn.hover();
      await wait(600);
    } catch (_) {}

    // Move mouse away
    await page.mouse.move(cx, cy + 200, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(800);
      await page.mouse.move(cx, cy + 200, { steps: 10 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
