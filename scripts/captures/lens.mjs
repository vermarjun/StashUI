/**
 * Capture choreography for lens.
 *
 * Effect: a magnifying circle follows the cursor over an image, zooming in
 * (zoomFactor 1.8) wherever the mouse rests. Strategy:
 *   1. Settle ~700 ms for image to load.
 *   2. Enter the image at top-left and move slowly across (left → right).
 *   3. Drift diagonally down-left → down-right (second pass).
 *   4. Arc to centre and dwell so the lens is fully visible.
 *   5. Slow drift to top-right corner.
 *   6. Return to centre — lens visible at rest — for clean loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Image sits roughly centred; estimate its bounds (480 px wide, 3:2 aspect)
  const imgW = Math.round(W * 0.5);
  const imgH = Math.round(imgW * (2 / 3));
  const imgLeft  = Math.round((W - imgW) / 2);
  const imgTop   = Math.round((H - imgH) / 2 - H * 0.04); // slight upward bias
  const imgRight = imgLeft + imgW;
  const imgBot   = imgTop  + imgH;
  const cx = Math.round((imgLeft + imgRight) / 2);
  const cy = Math.round((imgTop  + imgBot)  / 2);

  // Settle
  try { await wait(700); } catch (_) {}

  // Enter at top-left of image
  try {
    await page.mouse.move(imgLeft + 30, imgTop + 30, { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Slow sweep left → right across upper third
  try {
    await page.mouse.move(imgRight - 30, imgTop + Math.round(imgH * 0.25), { steps: 40 });
    await wait(400);
  } catch (_) {}

  // Diagonal drift down-left
  try {
    await page.mouse.move(imgLeft + 40, imgBot - 50, { steps: 35 });
    await wait(400);
  } catch (_) {}

  // Sweep across lower third
  try {
    await page.mouse.move(imgRight - 40, imgBot - 40, { steps: 35 });
    await wait(400);
  } catch (_) {}

  // Arc to centre and dwell
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(700);
  } catch (_) {}

  // Drift to top-right
  try {
    await page.mouse.move(imgRight - 30, imgTop + 30, { steps: 25 });
    await wait(400);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(400);
  } catch (_) {}
}
