/**
 * Capture choreography for stripe-bg-guides (StripeBgGuides).
 *
 * StripeBgGuides renders dashed vertical guide lines with animated glowing
 * particles that travel up and down. The component uses `contained` mode so
 * the fixed overlay sits inside the preview container. The randomize interval
 * is 9 s — within the capture window some columns will light and others go
 * dark. Strategy: short settle, then a brief dwell. The guide animation is
 * slow (animationDuration=62 s) so little horizontal motion is needed — just
 * let the glows travel vertically.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from content.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
  } catch (_) {}

  // Settle: let glowing particles initialise their staggered animation.
  try {
    await wait(2500);
  } catch (_) {}

  // Slow horizontal sweep to show the column layout.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.5), { steps: 14 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.5), { steps: 28 });
    await wait(500);
  } catch (_) {}

  // Return off-content; end dwell.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.05), { steps: 14 });
    await wait(1000);
  } catch (_) {}
}
