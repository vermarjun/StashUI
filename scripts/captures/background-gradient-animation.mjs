/**
 * Capture choreography for background-gradient-animation.
 *
 * Effect: five radial-gradient blobs (blue, purple, cyan, red, yellow) animate
 * continuously via CSS keyframes (`animate-first` … `animate-fifth`) with
 * mix-blend-mode:hard-light + an SVG goo filter (feGaussianBlur + feColorMatrix).
 * When `interactive=true` (default) a sixth pointer-following blob tracks the
 * mouse — it is the most visible interactive element.
 *
 * Strategy:
 *   1. Settle ~1 s for CSS animations to begin and the goo filter to activate.
 *   2. Dwell at centre ~2 s — all five blobs orbit visible paths.
 *   3. Move mouse slowly from top-left to bottom-right across the whole container
 *      so the pointer blob drags through multiple orbiting blobs (creates vivid
 *      colour mixing).
 *   4. Arc from bottom-right back to top-left.
 *   5. Return to centre — loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle for CSS animations and goo filter paint.
  try { await wait(1000); } catch (_) {}

  // Dwell at centre — all blobs orbit around this area.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await wait(2000);
  } catch (_) {}

  // Slow diagonal sweep top-left → bottom-right (pointer blob drags through orbits).
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.1), { steps: 8 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.9), { steps: 50 });
    await wait(600);
  } catch (_) {}

  // Arc back bottom-right → top-left (reverse direction for loop variety).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 25 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.5), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Return to centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
    await wait(400);
  } catch (_) {}
}
