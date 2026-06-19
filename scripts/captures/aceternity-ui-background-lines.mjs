/**
 * Capture choreography for: aceternity-ui-background-lines
 * Shared source: background-lines.tsx (same component as background-lines).
 * Demo is NOT edited per task rules.
 * Behaviour: 42 SVG paths with strokeDashoffset animation drawing in/out
 * on staggered random delays over 10 s. Self-animating, no pointer reactive.
 * Strategy: settle ~1 s for motion opacity fade + first paths to start
 * animating, dwell ~5 s to show multiple lines through draw-in and fade-out
 * phases, then return to start.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from path origins (most pass near centre W=720)
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
  } catch (_) {}

  // Settle: motion opacity fade-in (1 s transition) + first stroke starts
  try {
    await wait(1200);
  } catch (_) {}

  // Dwell phase 1: first wave of lines drawing in and crossing the canvas
  try {
    await wait(2500);
  } catch (_) {}

  // Dwell phase 2: staggered second batch begins, first wave fades out
  try {
    await wait(2500);
  } catch (_) {}

  // End near start position for clean loop seam
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
    await wait(300);
  } catch (_) {}
}
