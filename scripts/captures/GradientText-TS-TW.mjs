/**
 * Capture choreography for GradientText-TS-TW
 *
 * GradientText animates a linear gradient background-position via
 * useAnimationFrame (motion/react). The gradient cycles continuously at
 * animationSpeed (default 8 s). pauseOnHover=false by default, so no
 * interaction is needed — just mount and dwell.
 *
 * Strategy:
 *   1. Short mount settle for motion/react animation frame setup.
 *   2. Move mouse to centre (neutral).
 *   3. Dwell ~3 s to capture a full visible gradient sweep.
 *   4. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Animation frame setup settle
  try {
    await wait(300);
  } catch (_) {}

  // Centre mouse
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}

  // Dwell to capture the animated gradient sweep
  try {
    await wait(3000);
  } catch (_) {}

  // Final settle at centre for loop seam
  try {
    await wait(300);
  } catch (_) {}
}
