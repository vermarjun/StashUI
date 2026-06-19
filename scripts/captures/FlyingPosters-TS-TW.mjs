/**
 * Capture choreography for FlyingPosters-TS-TW
 *
 * FlyingPosters renders an OGL WebGL scene of 3D textured planes scrolling
 * along a path. The component listens to wheel/touch events via its own
 * scroll handler (scrollEase=0.01). Firing wheel events nudges the target
 * scroll position; the lerp easing gives a smooth continuous motion.
 *
 * Strategy:
 *   1. Settle 1 s for OGL init and picsum images to load.
 *   2. Dwell 2 s — posters already animate continuously on their own.
 *   3. Send a sequence of wheel ticks to scroll the path forward and show
 *      more posters flying in.
 *   4. Pause ~1 s after each scroll burst to show the eased deceleration.
 *   5. End with mouse near centre — clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL context + poster textures need to load
  try {
    await wait(1000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Hover centre so any pointer-based effects are active
  try {
    await page.mouse.move(cx, cy, { steps: 6 });
  } catch (_) {}

  // Dwell while auto-scroll/animation plays
  try {
    await wait(2000);
  } catch (_) {}

  // Scroll forward — nudge the internal scroll target
  try {
    await page.mouse.wheel({ deltaY: 300 });
    await wait(600);
    await page.mouse.wheel({ deltaY: 300 });
    await wait(600);
    await page.mouse.wheel({ deltaY: 300 });
    await wait(800);
  } catch (_) {}

  // Slight reverse scroll to show bidirectional path
  try {
    await page.mouse.wheel({ deltaY: -200 });
    await wait(800);
  } catch (_) {}

  // Gentle drift so the last frame has motion
  try {
    await page.mouse.move(Math.round(W * 0.45), Math.round(H * 0.45), { steps: 10 });
    await wait(500);
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
