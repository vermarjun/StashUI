/**
 * Capture choreography for aurora-background.
 *
 * Effect: a CSS `animate-aurora` animation (backgroundPosition sweeping 50%→0%)
 * applied to a `repeating-linear-gradient` of blues/indigos/violets with an
 * `invert` filter and mix-blend-difference after-pseudo for the dark-mode
 * aurora shimmer. A radial-gradient mask clips the aurora to the upper-right
 * quadrant.
 *
 * No pointer reactivity — purely time-driven CSS animation.
 *
 * Strategy:
 *   1. Settle ~1.5 s for the aurora CSS animation to reach a visible midpoint
 *      (the gradient position starts at 50% and sweeps to 0%).
 *   2. Dwell at centre ~3 s — the aurora sweeps across the upper-right region.
 *   3. Slow mouse drift from top-right (aurora hotspot) to bottom-left.
 *   4. Return to centre — loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle for aurora animation paint.
  try { await wait(1500); } catch (_) {}

  // Position mouse near the aurora hotspot (upper-right per mask).
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.2), { steps: 8 });
    await wait(3000);
  } catch (_) {}

  // Slow drift across to bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.75), { steps: 40 });
    await wait(600);
  } catch (_) {}

  // Return to centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
