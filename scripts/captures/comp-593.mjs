/**
 * Capture choreography for comp-593
 * Header with a breadcrumb (Home icon → "Reports") on the left, and DatePicker,
 * Filters, and "Saved" button on the right.
 * Type: BREADCRUMB — hover the home breadcrumb link, then click the DatePicker
 * to open a calendar popover, then hover "Filters" and "Saved".
 * Sequence: hover Home breadcrumb → hover "Reports" → click DatePicker trigger
 *           → dwell (calendar open) → press Escape → hover Filters → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  try {
    // Hover the Home icon breadcrumb link
    const homeLink = page.getByRole("link", { name: /home/i }).first();
    await homeLink.waitFor({ state: "visible", timeout: 4000 });
    await homeLink.hover();
    await wait(700);

    // Move to "Reports" breadcrumb page text
    try {
      const reportsText = page.getByText(/reports/i).first();
      await reportsText.hover();
      await wait(600);
    } catch (_) {}

    // Click the DatePicker trigger button to open calendar
    try {
      // DatePicker is typically a button showing a date or calendar icon
      const datePickerBtn = page.locator("button").filter({ hasText: /pick a date|select date/i }).first();
      await datePickerBtn.click();
      await wait(1200);
      await page.keyboard.press("Escape");
      await wait(600);
    } catch (_) {
      // Fallback: click any button near the right side that opens a popover
      try {
        const buttons = page.locator("header button");
        const count = await buttons.count();
        if (count > 0) {
          await buttons.nth(0).click();
          await wait(1000);
          await page.keyboard.press("Escape");
          await wait(600);
        }
      } catch (_) {}
    }

    // Hover Filters button
    try {
      const filtersBtn = page.getByRole("button", { name: /filters/i });
      await filtersBtn.hover();
      await wait(700);
    } catch (_) {}

    // Hover Saved button
    try {
      const savedBtn = page.getByRole("button", { name: /saved/i });
      await savedBtn.hover();
      await wait(600);
    } catch (_) {}

    // Move mouse away
    await page.mouse.move(cx, cy + 160, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(800);
      await page.mouse.move(cx, cy + 160, { steps: 10 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
