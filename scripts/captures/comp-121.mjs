// comp-121: Social login buttons with icon + label, outline variant, stacked column
// Layout: 4 full-width outline buttons stacked vertically
// Choreography: hover each, click one, end at rest ~3s

export default async function capture({ page, W, H }) {
  // Hover Google button
  try {
    const btn = page.getByRole("button", { name: /google/i });
    await btn.hover();
    await page.waitForTimeout(350);
  } catch (_) {}

  // Hover X button
  try {
    const btn = page.getByRole("button", { name: /login with x/i });
    await btn.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover Facebook button
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
