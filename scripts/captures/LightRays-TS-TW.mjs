/**
 * Capture choreography for LightRays-TS-TW
 *
 * LightRays renders an OGL WebGL shader of volumetric light rays emanating from
 * a configurable origin (default: top-center). followMouse=true and
 * mouseInfluence=0.15 mean the ray direction gently bends toward the cursor,
 * creating a soft parallax sweep.
 *
 * Strategy:
 *   1. Settle ~2 s for OGL + IntersectionObserver visibility detection.
 *   2. Move cursor to top-centre (near the ray origin) to seed uMousePos.
 *   3. Slow drift left → right across the viewport so the ray fans out and
 *      follows the pointer — shows the directional influence.
 *   4. Dwell ~2 s at the right side.
 *   5. Return cursor to centre-top for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL + IntersectionObserver settle
  try {
    await wait(2000);
  } catch (_) {}

  // Seed near the ray origin (top-centre)
  try {
    await page.mouse.move(cx, Math.round(H * 0.15), { steps: 5 });
    await wait(300);
  } catch (_) {}

  // Drift left — ray bends left, shows directional bloom
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.35), { steps: 50 });
    await wait(800);
  } catch (_) {}

  // Drift right across viewport — ray sweeps
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.35), { steps: 80 });
    await wait(2000);
  } catch (_) {}

  // Return to near origin
  try {
    await page.mouse.move(cx, Math.round(H * 0.15), { steps: 40 });
    await wait(400);
  } catch (_) {}
}
