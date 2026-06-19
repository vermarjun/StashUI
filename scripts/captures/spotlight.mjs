/**
 * Capture choreography for spotlight.
 *
 * Effect: a large SVG ellipse beam rendered with a Gaussian blur filter and
 * animated via CSS `animate-spotlight` (opacity 0→1, translate). The beam is
 * absolutely positioned top-left, pointing into the scene from upper-left.
 * Strategy:
 *   1. Wait ~1.5 s for the CSS spotlight animation to complete (opacity rises).
 *   2. Move mouse slowly from left edge across the container to the right,
 *      passing through the beam hotspot so the glow is clearly visible.
 *   3. Arc down toward bottom-centre.
 *   4. Return near top-left for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for spotlight CSS animation to finish (opacity 0 → 1).
  try { await wait(1500); } catch (_) {}

  // Hover across the upper portion where the beam is brightest.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.2), { steps: 5 });
    await wait(200);
  } catch (_) {}

  // Slow sweep left → right through the beam.
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.25), { steps: 40 });
    await wait(800);
  } catch (_) {}

  // Arc down to centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.55), { steps: 25 });
    await wait(600);
  } catch (_) {}

  // Dwell at centre.
  try { await wait(500); } catch (_) {}

  // Return near upper-left — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.15), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
