/**
 * Capture choreography for 3d-marquee
 *
 * ThreeDMarquee renders a perspective-tilted 4-column grid of images. Even-
 * indexed columns animate y: 0→100 and odd columns y: 0→-100 in a looping
 * Framer Motion tween (10–15s). The grid is huge (1720px) and scaled down
 * via CSS — the perspective transform creates a receding 3D tile effect.
 *
 * Strategy: settle ~1000ms for picsum images to load from the network, then
 * dwell ~3.5s so the alternating column drift is clearly visible. No hover or
 * click interaction needed — the continuous opposite-direction slide is the
 * showstopper.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow picsum.photos images to load across 12 entries
  try { await wait(1000); } catch (_) {}

  // Dwell while the perspective columns slide in opposite directions
  try { await wait(3500); } catch (_) {}

  // Hold a clean final frame before loop seam
  try { await wait(200); } catch (_) {}
}
