/**
 * Capture choreography for bg-animated-fractal-dot-grid (FractalDotGrid).
 *
 * Identical canvas-ripple mechanic to canvas-fractal-grid but without the
 * animated colour gradient layer. The dots deform toward the pointer and glow
 * on approach. Strategy:
 *   1. Settle ~2 s: canvas initialises, motion.dev fade-in completes (~1.5 s).
 *   2. Drift mouse to centre — ripple bloom.
 *   3. Slow diagonal sweep top-left → bottom-right to show wave travelling.
 *   4. Pause at bottom-right.
 *   5. Return to centre for a dwell.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Park mouse off-canvas so initial ripple origin is neutral.
  try {
    await page.mouse.move(0, 0, { steps: 1 });
    await wait(2000);
  } catch (_) {}

  // Move to centre — wave blooms.
  try {
    await page.mouse.move(cx, cy, { steps: 30 });
    await wait(1000);
  } catch (_) {}

  // Slow diagonal sweep top-left → bottom-right.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.15), { steps: 24 });
    await wait(500);
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.8), { steps: 40 });
    await wait(800);
  } catch (_) {}

  // Lift to upper-right — show the glow trailing.
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.2), { steps: 26 });
    await wait(700);
  } catch (_) {}

  // Return to centre for loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(1500);
  } catch (_) {}
}
