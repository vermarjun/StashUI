/**
 * Capture choreography for: components-backgrounds-stars
 * Behaviour: three StarLayer divs (1000@1px, 400@2px, 200@3px) scroll upward
 * at staggered speeds (slow/medium/fast relative to speed=50 s baseline).
 * Mouse triggers a spring-based parallax offset. Dark radial-gradient bg.
 * Strategy: let layers establish scroll velocity (short settle), then drift
 * mouse to show parallax, then dwell for a clean mid-scroll frame.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the three motion layers mount and their animations initialise
  try {
    await wait(600);
  } catch (_) {}

  // Park mouse at centre to keep parallax neutral initially
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Dwell phase 1: star layers are scrolling — small/medium/large all visible
  try {
    await wait(1500);
  } catch (_) {}

  // Gentle mouse drift to show spring-based parallax offset
  try {
    await page.mouse.move(W * 0.62, H * 0.42, { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Return mouse toward centre for a clean loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Final dwell
  try {
    await wait(800);
  } catch (_) {}
}
