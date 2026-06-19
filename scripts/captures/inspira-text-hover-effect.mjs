/**
 * Capture choreography for inspira-text-hover-effect
 * (source: text-hover-effect.tsx).
 *
 * Behaviour: SVG text with animated stroke-dashoffset (draws the stroke over
 * ~4 s on hover). While the cursor is inside the SVG:
 *   - A radial gradient mask follows the mouse, revealing a colourful gradient
 *     fill underneath.
 *   - The background outline fades in to opacity=0.75.
 * Strategy:
 *   1. Wait for SVG to mount (~500 ms).
 *   2. Move mouse onto the left edge of the SVG to set hovered=true and start
 *      the stroke draw-in animation.
 *   3. Wait ~1.5 s for the stroke to partially draw (it takes 4 s total).
 *   4. Slowly sweep left → right across the full SVG width so the radial
 *      gradient mask visibly follows the cursor, revealing the gradient fill.
 *   5. Brief dwell at the right edge.
 *   6. Sweep back to centre.
 *   7. Exit the SVG to reset hover state, return to start.
 */
export default async function capture(page, { W, H, wait }) {
  // Locate the SVG element.
  let svgBox;
  try {
    const svg = page.locator('svg').first();
    await svg.waitFor({ state: 'visible', timeout: 8000 });
    svgBox = await svg.boundingBox();
  } catch (_) {
    svgBox = { x: W * 0.05, y: H * 0.2, width: W * 0.9, height: H * 0.6 };
  }

  const { x, y, width, height } = svgBox;
  const midY = y + height * 0.5;

  // Park cursor above the SVG initially.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.05), { steps: 4 });
    await wait(300);
  } catch (_) {}

  // Enter SVG at the left edge to trigger hovered=true.
  try {
    await page.mouse.move(x + width * 0.04, midY, { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Wait ~1.5 s for the stroke draw-in animation to make visible progress.
  try {
    await wait(1500);
  } catch (_) {}

  // Slowly sweep left → right across the text, revealing the gradient under
  // the radial mask cursor spotlight (~55 ms per step × 40 steps ≈ 2.2 s).
  try {
    const steps = 40;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        x + width * 0.04 + width * 0.92 * t,
        midY,
      );
      await wait(55);
    }
  } catch (_) {}

  // Dwell at the right edge with the gradient fill fully revealed.
  try {
    await wait(600);
  } catch (_) {}

  // Sweep back to centre.
  try {
    await page.mouse.move(x + width * 0.5, midY, { steps: 16 });
    await wait(400);
  } catch (_) {}

  // Exit the SVG so hovered resets to false.
  try {
    await page.mouse.move(x - 60, midY, { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Return to top-park position for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.05), { steps: 6 });
    await wait(200);
  } catch (_) {}
}
