/**
 * Capture choreography for FluidGlass-TS-TW
 *
 * FluidGlass renders a @react-three/fiber Canvas with ScrollControls.
 * The default mode is "lens" — a glass lens object that follows the scroll
 * position and distorts content behind it via MeshTransmissionMaterial.
 * It may render blank in headless Chrome due to WebGL software fallback;
 * the orchestrator will fall back to a live preview if so.
 *
 * Strategy:
 *   1. Long settle ~2.5 s for R3F Canvas + drei MeshTransmissionMaterial to
 *      boot (large shader compilation step).
 *   2. Dwell 1.5 s while the initial scene is visible.
 *   3. Gentle downward scroll (wheel) to animate the lens along the
 *      ScrollControls pages.
 *   4. Pause to show the lens mid-scroll.
 *   5. Slow mouse drift across the centre (lens tracks pointer in some modes).
 *   6. Return to top — scroll back up to approximate start.
 */
export default async function capture(page, { W, H, wait }) {
  // R3F + drei compilation + texture load
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Move mouse to canvas centre
  try {
    await page.mouse.move(cx, cy, { steps: 6 });
  } catch (_) {}

  // Dwell — see initial scene
  try {
    await wait(1500);
  } catch (_) {}

  // Scroll down through pages
  try {
    await page.mouse.wheel({ deltaY: 400 });
    await wait(700);
    await page.mouse.wheel({ deltaY: 400 });
    await wait(700);
  } catch (_) {}

  // Gentle mouse drift while paused — lens reacts to pointer
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.45), { steps: 14 });
    await wait(500);
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.55), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Scroll back toward start
  try {
    await page.mouse.wheel({ deltaY: -800 });
    await wait(800);
  } catch (_) {}

  // Return mouse to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
