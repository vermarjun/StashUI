// comp-120: Social login icon-only buttons with brand colors (flex-1 stretch) — outline variant
// Layout: 4 icon buttons stretched in a row
// Choreography: hover each button with color reveal, click GitHub, end at rest ~2.5–3s

export default async function capture({ page, W, H }) {
  const buttons = page.getByRole("button");

  // Hover Google (red icon)
  try {
    await buttons.nth(0).hover();
    await page.waitForTimeout(350);
  } catch (_) {}

  // Hover Facebook (blue icon)
  try {
    await buttons.nth(1).hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover X (dark icon)
  try {
    await buttons.nth(2).hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover GitHub then click
  try {
    const btn3 = buttons.nth(3);
    await btn3.hover();
    await page.waitForTimeout(350);
    await btn3.click();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Move mouse away to show resting state
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.waitForTimeout(400);
  } catch (_) {}
}
