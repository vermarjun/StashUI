/**
 * Capture choreography for spotlight-card
 *
 * The spotlight tracks the pointer via CSS variables (--x, --y) updated on
 * mousemove. The goal is a slow arc across the card so the radial gradient
 * "spotlight" visibly sweeps the surface.
 *
 * Strategy:
 *   1. Settle into the card centre.
 *   2. Slowly arc the pointer across the card from left-edge to right-edge,
 *      pausing mid-sweep so the spotlight glow is clearly visible.
 *   3. Loop back to centre, then arc top-to-bottom for variety.
 *   4. Retreat to a neutral position near the card centre to close the loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Find the SpotlightCard by its data-slot or just use the card bounding box
  const cardSelector = '[class*="rounded-xl"][class*="border"]';

  // Centre of the viewport is where the card lives (align: center)
  const cx = W / 2;
  const cy = H / 2;

  // Settle
  try {
    await wait(400);
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Slow left-to-right arc across the card, staying roughly on the card
  try {
    const startX = cx - 140;
    const endX = cx + 140;
    await page.mouse.move(startX, cy - 30, { steps: 5 });
    await wait(200);
    await page.mouse.move(endX, cy + 30, { steps: 40 });
    await wait(700);
  } catch (_) {}

  // Sweep back across, slightly higher
  try {
    await page.mouse.move(cx - 120, cy - 60, { steps: 30 });
    await wait(500);
  } catch (_) {}

  // Arc diagonally — top-left to bottom-right
  try {
    await page.mouse.move(cx + 120, cy + 70, { steps: 35 });
    await wait(600);
  } catch (_) {}

  // Return to centre to close the loop cleanly
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(500);
  } catch (_) {}
}
