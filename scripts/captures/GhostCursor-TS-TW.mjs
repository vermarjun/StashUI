/**
 * Capture choreography for GhostCursor-TS-TW
 *
 * GhostCursor mounts a Three.js WebGL renderer as a full-bleed canvas overlay
 * inside its parent (which must have `position:relative`). It paints a smoky
 * blob shader that follows the pointer; trailing positions are stored in a
 * circular buffer (trailLength=50) and blended into the fragment shader to
 * create a ghost smear. The renderer starts a rAF loop on first pointer enter
 * and fades out after 1 s of inactivity.
 *
 * WebGL may be blank headless — the orchestrator will fall back gracefully.
 * We still author a rich choreography so real-browser captures work.
 *
 * Strategy:
 *   1. Longer initial settle (2 s) for WebGL context init + first render.
 *   2. Enter from the lower-left corner so the first trail smear is obvious.
 *   3. Trace a slow figure-8 across the full container to build up the ghost
 *      trail across both halves of the canvas.
 *   4. Pause at top-right to let the bloom fade gracefully (fadeDelayMs 1000).
 *   5. Return to lower-left for a clean loop seam.
 *
 * All coordinates stay within (0→W, 0→H) since events are scoped to `parent`.
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL context init + first rAF frame
  try {
    await wait(2000);
  } catch (_) {}

  // Enter from lower-left
  try {
    await page.mouse.move(W * 0.08, H * 0.82, { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Figure-8 — upper-left lobe
  try {
    const upper = [
      [W * 0.2,  H * 0.6 ],
      [W * 0.35, H * 0.3 ],
      [W * 0.5,  H * 0.18],
      [W * 0.65, H * 0.3 ],
      [W * 0.8,  H * 0.2 ],
      [W * 0.88, H * 0.38],
      // cross to lower lobe
      [W * 0.7,  H * 0.55],
      [W * 0.5,  H * 0.5 ],
      [W * 0.3,  H * 0.55],
      [W * 0.15, H * 0.68],
      [W * 0.1,  H * 0.82],
      [W * 0.25, H * 0.88],
      [W * 0.5,  H * 0.82],
      [W * 0.75, H * 0.88],
      [W * 0.88, H * 0.75],
      [W * 0.75, H * 0.6 ],
      [W * 0.5,  H * 0.5 ],
      [W * 0.2,  H * 0.6 ]
    ];
    for (const [x, y] of upper) {
      await page.mouse.move(x, y, { steps: 22 });
      await wait(55);
    }
  } catch (_) {}

  // Dwell at centre so trail blends
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 16 });
    await wait(1200);
  } catch (_) {}

  // Let fade begin (stop moving → fadeDelay 1 s → fadeDuration 1.5 s starts)
  try {
    await wait(800);
  } catch (_) {}

  // Return to lower-left for loop seam
  try {
    await page.mouse.move(W * 0.08, H * 0.82, { steps: 20 });
    await wait(300);
  } catch (_) {}
}
