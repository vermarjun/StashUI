/**
 * Capture choreography for orbit.
 *
 * Effect: two elements orbit a central "Center" div — an inner ⚡ circle
 * (radius 80, 8 s clockwise) and an outer 🌙 circle (radius 130, 14 s
 * counter-clockwise). Both run via CSS keyframe animation continuously.
 * No pointer interaction changes the animation.
 *
 * Strategy:
 *   1. Settle ~300 ms for animation keyframes to inject and first frames
 *      to paint.
 *   2. Park pointer at frame centre (doesn't affect orbits).
 *   3. Dwell ~3 s — enough to see the inner circle complete ~3/8 of a
 *      revolution and the outer circle ~3/14 of a revolution, giving a
 *      clear sense of the orbital motion and opposing directions.
 *   4. Very gentle drift to show the SVG path circles underneath.
 *   5. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle
  try { await wait(300); } catch (_) {}

  // Park at centre
  try {
    await page.mouse.move(cx, cy, { steps: 6 });
  } catch (_) {}

  // Dwell — let orbiting elements accumulate visible arc
  try { await wait(3000); } catch (_) {}

  // Slow drift outward to reveal the SVG guide circles
  try {
    await page.mouse.move(Math.round(cx + 60), Math.round(cy - 40), { steps: 20 });
    await wait(800);
    await page.mouse.move(Math.round(cx - 50), Math.round(cy + 50), { steps: 20 });
    await wait(800);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(400);
  } catch (_) {}
}
