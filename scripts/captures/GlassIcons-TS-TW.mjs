/**
 * Capture choreography for GlassIcons-TS-TW
 *
 * GlassIcons renders a grid of CSS 3D-transformed buttons that tilt on hover
 * (perspective:24em, transform-style:preserve-3d). The tilt is driven by
 * CSS :hover state + JS pointer tracking per button. Each icon has an aria-label.
 *
 * Strategy:
 *   1. Short settle 600 ms for paint.
 *   2. Hover each of the 6 icons in sequence (by aria-label); dwell ~600 ms
 *      on each to show the tilt.
 *   3. After the last icon, move back toward the first to close the loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for component to mount and paint
  try {
    await wait(600);
  } catch (_) {}

  const labels = ['Home', 'Favorites', 'Alerts', 'Messages', 'Search', 'Settings'];

  for (const label of labels) {
    try {
      const btn = page.locator(`button[aria-label="${label}"]`).first();
      const box = await btn.boundingBox();
      if (box) {
        // Move onto the icon centre
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
        await wait(600);
        // Slight offset to make the 3-D tilt direction visible
        await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.3, { steps: 6 });
        await wait(300);
      }
    } catch (_) {}
  }

  // Return to the Home icon to close the loop cleanly
  try {
    const home = page.locator('button[aria-label="Home"]').first();
    const homeBox = await home.boundingBox();
    if (homeBox) {
      await page.mouse.move(homeBox.x + homeBox.width / 2, homeBox.y + homeBox.height / 2, { steps: 14 });
      await wait(400);
    }
  } catch (_) {}
}
