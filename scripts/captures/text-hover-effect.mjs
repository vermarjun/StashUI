/**
 * Capture choreography for text-hover-effect.
 *
 * Behaviour: SVG text with an animated stroke-dashoffset that draws itself in
 * over ~4s on mount. While hovered, a radial gradient mask follows the cursor
 * and reveals coloured gradient text underneath.
 * Strategy: wait for the draw-in animation (~2s), then slowly sweep the mouse
 * left→right across the SVG to reveal the gradient fill under the cursor,
 * then exit to reset.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the SVG to mount
  let svgBox;
  try {
    const svg = page.locator('svg').first();
    await svg.waitFor({ state: 'visible', timeout: 8000 });
    svgBox = await svg.boundingBox();
  } catch {
    svgBox = { x: W * 0.05, y: H * 0.25, width: W * 0.9, height: H * 0.5 };
  }

  const { x, y, width, height } = svgBox;
  const midY = y + height * 0.5;

  // Wait for the stroke draw-in animation to partially complete (~1.5s)
  try {
    await wait(1500);
  } catch { /* ignore */ }

  // Move to left edge of SVG to begin hover reveal
  try {
    await page.mouse.move(x + width * 0.05, midY, { steps: 8 });
    await wait(300);
  } catch { /* ignore */ }

  // Slow sweep left → right across the text to reveal the gradient
  const sweepSteps = 40;
  try {
    for (let i = 1; i <= sweepSteps; i++) {
      const t = i / sweepSteps;
      await page.mouse.move(
        x + width * 0.05 + (width * 0.9) * t,
        midY,
      );
      await wait(55);
    }
  } catch { /* ignore */ }

  // Pause at right edge with gradient fully revealed
  try {
    await wait(600);
  } catch { /* ignore */ }

  // Move back to left to show effect resets
  try {
    await page.mouse.move(x + width * 0.5, midY, { steps: 16 });
    await wait(400);
  } catch { /* ignore */ }

  // Exit SVG so hover state clears
  try {
    await page.mouse.move(x - 60, midY, { steps: 8 });
    await wait(400);
  } catch { /* ignore */ }
}
