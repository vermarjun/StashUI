// comp-119: Social login icon-only buttons (Google, Facebook, X, GitHub) — outline variant
// Layout: 4 icon buttons in a row
// Choreography: hover each button, click one, end at rest ~2.5–3s

export default async function capture({ page, W, H }) {
  // Locate all 4 icon buttons
  const buttons = page.getByRole("button");
  const count = await buttons.count();

  // Hover Google button
  try {
    const btn0 = buttons.nth(0);
    await btn0.hover();
    await page.waitForTimeout(350);
  } catch (_) {}

  // Hover Facebook button
  try {
    const btn1 = buttons.nth(1);
    await btn1.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover X button
  try {
    const btn2 = buttons.nth(2);
    await btn2.hover();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Hover GitHub button and click
  try {
    const btn3 = buttons.nth(3);
    await btn3.hover();
    await page.waitForTimeout(350);
    await btn3.click();
    await page.waitForTimeout(300);
  } catch (_) {}

  // Return mouse to center to end near resting state
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.waitForTimeout(400);
  } catch (_) {}
}
