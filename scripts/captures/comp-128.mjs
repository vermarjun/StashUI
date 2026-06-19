// comp-128: Card-style outline button ("Talent Agency") with title + subtitle + right chevron
// Layout: single wide outline button with text block and animated chevron
// Choreography: hover to show chevron slide, click, end at rest ~2.5–3s

export default async function capture({ page, W, H }) {
  // Hover the button to trigger chevron translate animation
  try {
    const btn = page.getByRole("button", { name: /talent agency/i });
    await btn.hover();
    await page.waitForTimeout(700);
    // Click
    await btn.click();
    await page.waitForTimeout(400);
  } catch (_) {}

  // Move mouse away to rest
  try {
    await page.mouse.move(W / 2, H / 2 + 100);
    await page.waitForTimeout(500);
  } catch (_) {}
}
