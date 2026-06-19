// comp-26: Search input with icon and submit button
// Type: SEARCH — focus + type realistic query, then submit
// Sequence: focus input → type query → hover submit button → click → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  // Focus the search input
  try {
    const input = page.getByRole("searchbox");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(300);
  } catch (_) {
    try {
      const input = page.locator('input[type="search"]');
      await input.click();
      await wait(300);
    } catch (_) {}
  }

  // Type realistic search query
  try {
    await page.keyboard.type("design systems", { delay: 80 });
    await wait(500);
  } catch (_) {}

  // Hover the submit button (arrow-right)
  try {
    const submitBtn = page.getByRole("button", { name: /submit search/i });
    await submitBtn.hover();
    await wait(400);
    await submitBtn.click();
    await wait(300);
  } catch (_) {}

  // Return mouse near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
