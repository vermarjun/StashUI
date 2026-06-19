/**
 * Capture choreography for canvas-fractal-grid.
 *
 * CanvasFractalGrid renders a canvas dot grid that deforms when the pointer
 * approaches — dots push outward in a ripple wave. The gradient background
 * also animates slowly. Strategy:
 *   1. Settle ~2 s: canvas initialises, motion.dev fade-in completes (~1.5 s),
 *      gradient starts cycling.
 *   2. Move mouse to centre — watch the wave ripple bloom outward.
 *   3. Slow arc around the centre so the ripple tracks the pointer.
 *   4. Move to upper-left corner — show a different ripple position.
 *   5. Return to centre for a clean loop seam with a long dwell.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle off-canvas so initial mouse position doesn't deform dots.
  try {
    await page.mouse.move(0, 0, { steps: 1 });
    await wait(2000);
  } catch (_) {}

  // Move into the centre — wave ripple blooms.
  try {
    await page.mouse.move(cx, cy, { steps: 28 });
    await wait(1200);
  } catch (_) {}

  // Slow clockwise arc around centre (~half circle) to show the wave tracking.
  try {
    const r = Math.round(W * 0.22);
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const angle = (Math.PI * i) / steps; // 0 → π
      const x = Math.round(cx + r * Math.cos(angle));
      const y = Math.round(cy + r * Math.sin(angle));
      await page.mouse.move(x, y, { steps: 2 });
    }
    await wait(600);
  } catch (_) {}

  // Drift to upper-left quadrant.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 22 });
    await wait(900);
  } catch (_) {}

  // Return to centre for clean loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 24 });
    await wait(1500);
  } catch (_) {}
}
