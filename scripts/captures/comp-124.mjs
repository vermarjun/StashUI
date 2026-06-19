// comp-124: "Go back" link button with left chevron icon
// Layout: single link-style button
// Choreography: hover to show underline/color change, click, end at rest ~2.5s

export default async function capture({ page, W, H }) {
  // Hover the button
  try {
    const btn = page.getByRole("button", { name: /go back/i });
    await btn.hover();
    await page.waitForTimeout(600);
    // Click
    await btn.click();
    await page.waitForTimeout(400);
  } catch (_) {}

  // Move mouse away to show resting state
  try {
    await page.mouse.move(W / 2, H / 2 + 80);
    await page.waitForTimeout(500);
  } catch (_) {}
}
