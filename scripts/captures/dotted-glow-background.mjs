/**
 * Capture choreography for: dotted-glow-background
 * Behaviour: canvas-based dot grid where each dot has an independent
 * phase + speed producing organic shimmer/glow. No pointer interaction in
 * the component itself — but moving the mouse across the canvas provides
 * visual context and confirms the canvas fills its container.
 * Strategy: settle ~1 s for canvas resize + first frame, then slowly sweep
 * the mouse diagonally across to show dots glowing and dimming in waves,
 * dwell at centre, then return to start.
 */
export default async function capture(page, { W, H, wait }) {
  // Start at top-left
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 5 });
  } catch (_) {}

  // Settle: ResizeObserver fires, dots generated, first rAF frame drawn
  try {
    await wait(1000);
  } catch (_) {}

  // Slow diagonal sweep top-left → bottom-right
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Continue sweep to bottom-right
  try {
    await page.mouse.move(W * 0.9, H * 0.85, { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Dwell at bottom-right while shimmer continues
  try {
    await wait(1500);
  } catch (_) {}

  // Sweep back toward top-centre
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 30 });
    await wait(800);
  } catch (_) {}

  // Dwell again to show glow pulses
  try {
    await wait(1000);
  } catch (_) {}

  // Return to top-left for loop seam
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 15 });
    await wait(300);
  } catch (_) {}
}
