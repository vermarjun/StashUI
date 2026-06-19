/**
 * Capture choreography for CircularText-TS-TW
 *
 * CircularText renders text along a circular SVG path that spins via a CSS
 * animation. The demo shows two instances: one that speeds up on hover
 * (spinDuration 20 s → shorter) and one that pauses on hover (spinDuration
 * 30 s). Both auto-spin on mount.
 *
 * Strategy:
 *   1. Settle mount — the CSS animation starts immediately.
 *   2. Hover the first circle (left, ~25% W) to trigger speed-up, dwell.
 *   3. Hover the second circle (right, ~75% W) to trigger pause, dwell.
 *   4. Move mouse away so both circles resume their default behaviours.
 *   5. Dwell ~2 s to capture normal spinning for the loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(500);
  } catch (_) {}

  // Hover the left circle (speedUp) — located roughly at 25% W, 50% H
  try {
    await page.mouse.move(W * 0.25, H * 0.5, { steps: 18 });
    await wait(1200);
  } catch (_) {}

  // Slide across to the right circle (pause on hover)
  try {
    await page.mouse.move(W * 0.75, H * 0.5, { steps: 24 });
    await wait(1200);
  } catch (_) {}

  // Move mouse away from both circles so both resume default animation
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 18 });
    await wait(2000);
  } catch (_) {}
}
