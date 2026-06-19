/**
 * Capture choreography for image-trail-cursor.
 *
 * Effect: as the cursor moves across the container, a sequence of 190 px
 * image cards spawn at the cursor position and animate outward/fading in
 * a trail. Strategy:
 *   1. Settle ~800 ms so the component mounts.
 *   2. Enter near top-left and execute a slow, wide arc sweep (the trail
 *      needs sustained movement to spawn cards).
 *   3. Loop-the-loop diagonally so several trail images overlap.
 *   4. Return near the start to close the visual loop.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle — let component mount and mousemove listeners attach
  try { await wait(800); } catch (_) {}

  // Park at top-left quadrant
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 6 });
    await wait(200);
  } catch (_) {}

  // Slow arc sweep: left → right across upper third (spawns first batch of trail images)
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.25), { steps: 60 });
    await wait(300);
  } catch (_) {}

  // Diagonal down-left sweep
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.7), { steps: 55 });
    await wait(300);
  } catch (_) {}

  // Sweep right across lower half
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.75), { steps: 55 });
    await wait(300);
  } catch (_) {}

  // Curve up to centre — overlapping trail in mid-frame
  try {
    await page.mouse.move(cx, cy, { steps: 40 });
    await wait(400);
  } catch (_) {}

  // Wide arc: centre → top-right → centre-left → centre
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.18), { steps: 45 });
    await wait(200);
  } catch (_) {}
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.45), { steps: 50 });
    await wait(200);
  } catch (_) {}

  // Return near start for clean loop seam
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 35 });
    await wait(500);
  } catch (_) {}
}
