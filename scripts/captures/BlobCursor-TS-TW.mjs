/**
 * Capture choreography for BlobCursor-TS-TW
 *
 * BlobCursor renders three GSAP-animated blobs inside a full-bleed container
 * that responds to `onMouseMove`. The lead blob follows instantly
 * (fastDuration 0.1 s) while the trailing blobs lag behind (slowDuration 0.5 s),
 * creating a gooey, smeared effect through an SVG feGaussianBlur + feColorMatrix
 * filter.
 *
 * Strategy:
 *   1. Mount settle (give GSAP time to initialise).
 *   2. Enter from the left edge at mid-height.
 *   3. Trace a slow clockwise figure-8 across the container so the blob
 *      smear is prominent and the trail stretches visibly.
 *   4. Return to near the starting position so the GIF loops cleanly.
 *
 * NOTE: `onMouseMove` fires on the container, not `window`, so all moves
 * must stay within the rendered preview area (0→W, 0→H).
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(500);
  } catch (_) {}

  // Enter from left edge
  try {
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 8 });
    await wait(200);
  } catch (_) {}

  // Figure-8: first loop (upper arc, left → centre → right)
  try {
    const pts = [
      [W * 0.25, H * 0.3],
      [W * 0.5,  H * 0.2],
      [W * 0.75, H * 0.3],
      [W * 0.85, H * 0.5],
      [W * 0.75, H * 0.7],
      [W * 0.5,  H * 0.8],
      [W * 0.25, H * 0.7],
      [W * 0.1,  H * 0.5],
      // second loop — tighter upper arc
      [W * 0.3,  H * 0.35],
      [W * 0.5,  H * 0.28],
      [W * 0.7,  H * 0.35],
      [W * 0.5,  H * 0.5],
      [W * 0.3,  H * 0.65],
      [W * 0.5,  H * 0.72],
      [W * 0.7,  H * 0.65],
      [W * 0.5,  H * 0.5]
    ];
    for (const [x, y] of pts) {
      await page.mouse.move(x, y, { steps: 20 });
      await wait(60);
    }
  } catch (_) {}

  // Dwell at centre so trailing blobs catch up visibly
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 14 });
    await wait(700);
  } catch (_) {}

  // Return towards left-entry so loop seam is clean
  try {
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 18 });
    await wait(300);
  } catch (_) {}
}
