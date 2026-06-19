/**
 * Capture choreography for GridDistortion-TS-TW
 *
 * GridDistortion renders a Three.js WebGL plane with a custom shader that
 * distorts a texture image based on a data texture updated from mouse position.
 * Moving the mouse creates rippling grid distortion at the cursor location;
 * the relaxation uniform (0.9) lets the distortion decay smoothly when the
 * mouse stops.
 *
 * Strategy:
 *   1. Settle 2 s for Three.js + texture load from picsum.
 *   2. Slow circular sweep across the image — distortion follows the cursor,
 *      creating a rolling wave across the grid.
 *   3. Fast horizontal slash left→right — maximises local distortion.
 *   4. Pause 800 ms to watch relaxation decay.
 *   5. Slow drift back to centre — clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Three.js renderer + image texture load
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Move to centre first
  try {
    await page.mouse.move(cx, cy, { steps: 6 });
  } catch (_) {}

  // Slow circular sweep — 12-segment approximation
  try {
    const r = Math.round(Math.min(W, H) * 0.28);
    const segments = 12;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const tx = cx + Math.round(r * Math.cos(angle));
      const ty = cy + Math.round(r * Math.sin(angle));
      await page.mouse.move(tx, ty, { steps: 8 });
      await wait(60);
    }
  } catch (_) {}

  try {
    await wait(500);
  } catch (_) {}

  // Fast horizontal slash — peak distortion
  try {
    await page.mouse.move(Math.round(W * 0.1), cy, { steps: 3 });
    await page.mouse.move(Math.round(W * 0.9), cy, { steps: 14 });
  } catch (_) {}

  // Watch distortion relax
  try {
    await wait(800);
  } catch (_) {}

  // Slow drift diagonally
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.3), { steps: 14 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.7), { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(400);
  } catch (_) {}
}
