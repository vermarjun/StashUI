/**
 * Capture choreography for Plasma-TS-TW
 *
 * Plasma is an OGL WebGL2 full-screen shader (ray-marched plasma). It is a
 * time-driven animation; the mouseInteractive prop bends the plasma toward
 * the cursor position.
 *
 * Strategy:
 *   1. Settle 2.5 s for OGL renderer + WebGL2 shader compilation.
 *   2. Centre the mouse so uMouse initialises away from the default (0,0).
 *   3. Dwell 3 s — the plasma cycle animates through colour bands.
 *   4. Slow diagonal drift top-left → bottom-right — displaces the plasma
 *      field visibly via the mouseOffset uniform.
 *   5. Return to centre and hold.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL + WebGL2 shader compilation settle
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Initialise mouse at centre so the displacement starts neutral
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — plasma colour bands animate
  try {
    await wait(3000);
  } catch (_) {}

  // Diagonal drift: top-left to bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 6 });
    await wait(600);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.75), { steps: 24 });
    await wait(600);
  } catch (_) {}

  // Reverse drift
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.3), { steps: 16 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
