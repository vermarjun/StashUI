/**
 * Capture choreography for logo-cloud
 *
 * logo-cloud renders two sections:
 *   1. AnimatedLogoCloud — five logo copies side-by-side, infinitely translating
 *      left under a mask-image gradient (CSS animation, 30s period).
 *   2. StaticLogoCloud — a static 5-column grid shown below.
 *
 * Strategy: settle ~800ms for vectorlogo.zone SVGs to load, then dwell ~3.5s
 * so the animated strip completes a visible scroll segment. No interaction
 * needed — the motion is continuous and automatic.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow cross-origin SVGs from vectorlogo.zone to load
  try { await wait(800); } catch (_) {}

  // Dwell while the animated logo strip scrolls leftward
  try { await wait(3500); } catch (_) {}

  // Hold the final frame clean before loop seam
  try { await wait(200); } catch (_) {}
}
