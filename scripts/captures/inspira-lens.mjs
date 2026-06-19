/**
 * Capture choreography for inspira-lens (file: lens.demo.tsx).
 *
 * Effect: a 150 px magnifying circle (zoomFactor 2) follows the cursor
 * over a 550×350 mountain landscape image. Lens appears on mouseEnter
 * with a spring scale animation. Strategy:
 *   1. Settle ~700 ms for image to load.
 *   2. Enter the image near top-left — lens pops in.
 *   3. Slow sweep across upper third (left → right).
 *   4. Diagonal drift to lower-left.
 *   5. Sweep lower third (left → right).
 *   6. Arc to image centre and dwell — lens fully visible.
 *   7. Slow drift top-right, then return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // The Lens wraps a 550×350 img centred in a min-h-[400px] flex container.
  // Estimate image bounds (may be slightly smaller on narrow viewports).
  const imgW = Math.min(550, Math.round(W * 0.52));
  const imgH = Math.round(imgW * (350 / 550));
  const imgLeft  = Math.round((W - imgW) / 2);
  const imgTop   = Math.round((H - imgH) / 2);
  const imgRight = imgLeft + imgW;
  const imgBot   = imgTop + imgH;
  const cx = Math.round((imgLeft + imgRight) / 2);
  const cy = Math.round((imgTop + imgBot) / 2);

  // Settle
  try { await wait(700); } catch (_) {}

  // Enter image top-left — lens springs in
  try {
    await page.mouse.move(imgLeft + 35, imgTop + 35, { steps: 8 });
    await wait(250);
  } catch (_) {}

  // Slow sweep left → right across upper third
  try {
    await page.mouse.move(imgRight - 35, imgTop + Math.round(imgH * 0.22), { steps: 50 });
    await wait(350);
  } catch (_) {}

  // Diagonal drift to lower-left
  try {
    await page.mouse.move(imgLeft + 45, imgBot - 55, { steps: 40 });
    await wait(300);
  } catch (_) {}

  // Sweep lower third left → right
  try {
    await page.mouse.move(imgRight - 45, imgBot - 45, { steps: 40 });
    await wait(300);
  } catch (_) {}

  // Arc to centre and dwell
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(700);
  } catch (_) {}

  // Drift to top-right
  try {
    await page.mouse.move(imgRight - 35, imgTop + 35, { steps: 28 });
    await wait(350);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(400);
  } catch (_) {}
}
