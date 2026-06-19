// comp-123: Toggle expand/collapse ghost button ("Show more" / "Show less" + chevron)
// Layout: single ghost button
// Choreography: hover, click to expand (Show less + up chevron), hover again, click to collapse, end at rest ~3s

export default async function capture({ page, W, H }) {
  // Initial hover
  try {
    const btn = page.getByRole("button", { name: /show more/i });
    await btn.hover();
    await page.waitForTimeout(400);
    // Click to expand
    await btn.click();
    await page.waitForTimeout(500);
  } catch (_) {}

  // Hover on "Show less" state
  try {
    const btn = page.getByRole("button", { name: /show less/i });
    await btn.hover();
    await page.waitForTimeout(400);
    // Click to collapse back
    await btn.click();
    await page.waitForTimeout(500);
  } catch (_) {}

  // End near resting state — move mouse away
  try {
    await page.mouse.move(W / 2, H / 2 + 80);
    await page.waitForTimeout(400);
  } catch (_) {}
}
