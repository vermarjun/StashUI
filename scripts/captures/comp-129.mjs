// comp-129: Notification bell icon button with badge count (starts at 3, clears on click)
// Layout: single icon button with a red badge showing "3"
// Choreography: hover to show button state, click to clear badge (count→0), end at rest ~2.5–3s

export default async function capture({ page, W, H }) {
  // Hover the notifications button with badge showing "3"
  try {
    const btn = page.getByRole("button", { name: /notifications/i });
    await btn.hover();
    await page.waitForTimeout(600);
    // Click — badge disappears
    await btn.click();
    await page.waitForTimeout(500);
  } catch (_) {}

  // Move mouse away so the cleared state is visible at rest
  try {
    await page.mouse.move(W / 2, H / 2 + 80);
    await page.waitForTimeout(500);
  } catch (_) {}
}
