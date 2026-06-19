/**
 * Capture choreography for Hyperspeed-TS-TW
 *
 * Hyperspeed is a THREE.js + postprocessing scene that renders a neon highway
 * rushing toward the camera (turbulentDistortion preset by default). The scene
 * auto-animates; a click/touch triggers a speed-burst. Car lights, road
 * markings, and side-stick lights are all time-driven.
 *
 * Note: THREE.js + postprocessing (BloomEffect, SMAAEffect) require a longer
 * settle time and may be blank under headless GPU. Author anyway per spec.
 *
 * Strategy:
 *   1. Long settle ~3 s for THREE.js asset load + shader compile + bloom init.
 *   2. Move cursor to canvas centre.
 *   3. Dwell ~3 s — road, car lights, side sticks animate continuously.
 *   4. Optional click to trigger speed-burst if the default speed looks slow.
 *   5. Dwell another ~1.5 s through the burst, then settle back.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // THREE.js + postprocessing asset load + shader compile
  try {
    await wait(3000);
  } catch (_) {}

  // Cursor to centre
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(200);
  } catch (_) {}

  // Dwell — highway animation plays
  try {
    await wait(3000);
  } catch (_) {}

  // Trigger speed burst
  try {
    await page.mouse.down();
    await wait(400);
    await page.mouse.up();
  } catch (_) {}

  // Dwell through burst
  try {
    await wait(1500);
  } catch (_) {}
}
