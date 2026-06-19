/**
 * Capture choreography for Threads-TS-TW
 *
 * Threads is an OGL WebGL1 GLSL shader that renders 40 Perlin-noise-driven
 * thread lines that fan out from the left edge. enableMouseInteraction=true
 * samples uMouse (normalised 0–1 coords) to influence the line sweep and
 * amplitude: mouse.x shifts the time offset; mouse.y scales the amplitude.
 *
 * Strategy:
 *   1. Settle 2 s for OGL renderer + shader compilation.
 *   2. Position mouse at centre (x=0.5, y=0.5) — threads in their neutral
 *      mid-amplitude, mid-time configuration.
 *   3. Dwell 3 s — threads animate via Perlin noise, fan patterns visible.
 *   4. Slow upward drift (y 0.5 → 0.2) — reduces amplitude, threads flatten.
 *   5. Slow downward drift (y 0.2 → 0.8) — increases amplitude, threads bow.
 *   6. Horizontal sweep left→right (x 0.2 → 0.8) — time-shifts the noise,
 *      visibly displacing the thread phase.
 *   7. Return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL renderer + shader compilation
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Neutral mouse position
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — threads animate via noise
  try {
    await wait(3000);
  } catch (_) {}

  // Upward drift — flatten threads (lower amplitude)
  try {
    await page.mouse.move(cx, Math.round(H * 0.2), { steps: 18 });
    await wait(500);
  } catch (_) {}

  // Downward drift — bow threads (higher amplitude)
  try {
    await page.mouse.move(cx, Math.round(H * 0.8), { steps: 24 });
    await wait(500);
  } catch (_) {}

  // Horizontal sweep — phase-shift the noise
  try {
    await page.mouse.move(Math.round(W * 0.2), cy, { steps: 8 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.8), cy, { steps: 24 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
