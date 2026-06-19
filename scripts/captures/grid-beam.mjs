/**
 * Capture choreography for grid-beam (GridBeam).
 *
 * GridBeam renders glowing beams (horizontal + vertical) travelling along a
 * grid. The canvas animation starts immediately with `active=true`; a 0.8 s
 * smooth-step fade-in precedes steady beam travel. Intersections produce
 * bright flare dots. The `breathe` prop adds a sinusoidal strength pulse.
 *
 * Strategy:
 *   1. Settle ~2 s: canvas initialises, fade-in completes, first beams paint.
 *   2. Dwell at centre so the viewer sees beams crossing in the middle.
 *   3. Slow drift to each corner to show full grid coverage.
 *   4. Return to centre and rest for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle off the canvas content area (mouse parked top-left).
  try {
    await page.mouse.move(20, 20, { steps: 4 });
    await wait(2000);
  } catch (_) {}

  // Move to centre — watch beams converge at grid intersections.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(1500);
  } catch (_) {}

  // Drift to top-right.
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.15), { steps: 22 });
    await wait(700);
  } catch (_) {}

  // Drift to bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.82), { steps: 28 });
    await wait(700);
  } catch (_) {}

  // Return to centre for loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(1500);
  } catch (_) {}
}
