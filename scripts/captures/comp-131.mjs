// comp-131: Split button — "Merge pull request" + chevron dropdown to select merge strategy
// Layout: two joined buttons (label + icon chevron) with a dropdown menu
// Choreography: hover main button, hover chevron, open dropdown, hover an option, select it, close, end at rest ~3–3.5s

export default async function capture({ page, W, H }) {
  // Hover the main "Merge pull request" button
  try {
    const mainBtn = page.getByRole("button", { name: /merge pull request/i });
    await mainBtn.hover();
    await page.waitForTimeout(400);
  } catch (_) {}

  // Hover the chevron/options trigger button
  try {
    const chevronBtn = page.getByRole("button", { name: /options/i });
    await chevronBtn.hover();
    await page.waitForTimeout(350);
    // Click to open dropdown
    await chevronBtn.click();
    await page.waitForTimeout(400);
  } catch (_) {}

  // Hover "Squash and merge" option
  try {
    const option = page.getByRole("menuitemradio", { name: /squash and merge/i });
    await option.hover();
    await page.waitForTimeout(400);
    // Click to select
    await option.click();
    await page.waitForTimeout(400);
  } catch (_) {}

  // Hover the now-updated main button
  try {
    const mainBtn = page.getByRole("button", { name: /squash and merge/i });
    await mainBtn.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // End at resting state
  try {
    await page.mouse.move(W / 2, H / 2 + 100);
    await page.waitForTimeout(400);
  } catch (_) {}
}
