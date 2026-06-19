/**
 * Capture choreography for text-highlight.
 *
 * Behaviour: each TextHighlight span plays a `background-expand` CSS keyframe
 * that stretches the highlight background from 0 % → 100 % width. The demo
 * has two instances:
 *   - "beautiful interfaces"  delay=300 ms,  duration=1500 ms  (yellow)
 *   - "delight users"         delay=1200 ms, duration=1500 ms  (blue)
 * Both animations use `forwards` fill — they play once on mount and stay.
 * Strategy: park mouse away, wait for both highlights to complete (latest ends
 * at 1200 + 1500 = 2700 ms), then dwell ~1.5 s to display the fully-drawn
 * highlights clearly.
 */
export default async function capture(page, { W, H, wait }) {
  // Park cursor in the top corner, away from the paragraph.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
  } catch (_) {}

  // Wait for both highlight animations to finish:
  // 1200 ms delay + 1500 ms duration = 2700 ms, add buffer.
  try {
    await wait(3200);
  } catch (_) {}

  // Dwell with both highlights fully drawn.
  try {
    await wait(1500);
  } catch (_) {}

  // Return to park for clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 3 });
    await wait(150);
  } catch (_) {}
}
