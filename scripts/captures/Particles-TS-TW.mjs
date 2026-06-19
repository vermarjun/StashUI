/**
 * Capture choreography for Particles-TS-TW
 *
 * Particles is an OGL WebGL point-cloud. Points are distributed in a sphere,
 * slowly rotate as a whole cloud, and the cluster shifts slightly when
 * moveParticlesOnHover=true (enabled in the demo). The animation is
 * continuous; the visual impact comes from seeing the full rotating sphere.
 *
 * Strategy:
 *   1. Settle 2.5 s for OGL renderer + particle geometry build.
 *   2. Move mouse to centre so the cluster snaps to a neutral offset.
 *   3. Dwell 3 s — the cloud rotates, revealing depth through particle
 *      parallax and colour variation.
 *   4. Gentle slow horizontal sweep — displaces the cluster position via
 *      the hover-follow mechanic, creating a visible smear/shift.
 *   5. Return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL renderer + particle geometry
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Initialise hover at centre
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — cloud rotates
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle left→right sweep to shift particle cluster
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.5), { steps: 8 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.5), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Gentle upward shift
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.35), { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
