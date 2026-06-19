// comp-122: Social login buttons with brand background colors, stacked column
// Layout: 4 full-width brand-colored buttons stacked vertically
// Choreography: hover each button to show hover state, click one, end at rest ~3s

export default async function capture({ page, W, H }) {
  // Hover Google (red bg)
  try {
    const btn = page.getByRole("button", { name: /google/i });
    await btn.hover();
    await page.waitForTimeout(350);
  } catch (_) {}

  // Hover X (dark bg)
  try {
    const btn = page.getByRole("button", { name: /login with x/i });
    await btn.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover Facebook (blue bg)
  try {
    const btn = page.getByRole("button", { name: /facebook/i });
    await btn.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover GitHub then click
  try {
    const btn = page.getByRole("button", { name: /github/i });
    await btn.hover();
    await page.waitForTimeout(350);
    await btn.click();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Move mouse to center to end near resting state
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.waitForTimeout(400);
  } catch (_) {}
}
