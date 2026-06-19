/**
 * Choreography: gradient-heading
 * Behavior: static gradient heading rendered via CSS bg-clip-text; no entrance animation.
 * Strategy: center-aligned, no scroll — brief mount wait then dwell ~2.5s.
 */
export default async function choreograph(page, { W, H }) {
  // Allow fonts and gradient to render.
  try {
    await page.waitForTimeout(600);
  } catch (e) {}

  // Hover over the heading to surface any hover-gradient interaction.
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.waitForTimeout(800);
  } catch (e) {}

  // Dwell.
  try {
    await page.waitForTimeout(1200);
  } catch (e) {}

  // Return mouse near start.
  try {
    await page.mouse.move(W / 2, H / 2 + 4);
  } catch (e) {}
}
