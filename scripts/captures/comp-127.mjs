// comp-127: D-pad / camera pan control — 4 arrow icon buttons + center circle in a 3×3 grid
// Layout: cross-shaped grid of 4 outline icon buttons
// Choreography: hover up, click up; hover left, click left; hover right; hover down, click down; end at rest ~3s

export default async function capture({ page, W, H }) {
  // Hover and click Pan Up
  try {
    const btn = page.getByRole("button", { name: /pan camera up/i });
    await btn.hover();
    await page.waitForTimeout(350);
    await btn.click();
    await page.waitForTimeout(250);
  } catch (_) {}

  // Hover and click Pan Left
  try {
    const btn = page.getByRole("button", { name: /pan camera left/i });
    await btn.hover();
    await page.waitForTimeout(300);
    await btn.click();
    await page.waitForTimeout(250);
  } catch (_) {}

  // Hover Pan Right
  try {
    const btn = page.getByRole("button", { name: /pan camera right/i });
    await btn.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover and click Pan Down
  try {
    const btn = page.getByRole("button", { name: /pan camera down/i });
    await btn.hover();
    await page.waitForTimeout(350);
    await btn.click();
    await page.waitForTimeout(300);
  } catch (_) {}

  // End near resting state
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.waitForTimeout(400);
  } catch (_) {}
}
