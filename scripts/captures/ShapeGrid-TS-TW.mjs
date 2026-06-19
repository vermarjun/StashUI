/**
 * Capture choreography for ShapeGrid-TS-TW
 *
 * ShapeGrid draws a 2D canvas grid of squares (default) that scrolls in a
 * configurable direction. Moving the mouse highlights cells with a fill
 * colour. The demo defaults use direction='right' and speed=1 — the grid
 * scrolls left-to-right continuously.
 *
 * Strategy:
 *   1. Settle 2 s for canvas resize and grid initialisation.
 *   2. Move mouse to canvas centre so the hovered cell highlight is visible.
 *   3. Dwell 3 s — the scrolling grid animates; the highlighted cell moves
 *      with the pointer.
 *   4. Slow diagonal sweep upper-left → lower-right — paints a trail of
 *      highlighted cells across the grid that fades via cellOpacities.
 *   5. Return to centre and settle.
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas resize + grid initialisation
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Hover at centre to reveal cell highlight
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — grid scrolls
  try {
    await wait(3000);
  } catch (_) {}

  // Diagonal sweep — paints cell hover trail
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 6 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.75), { steps: 30 });
    await wait(300);
  } catch (_) {}

  // Short horizontal sweep
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.5), { steps: 8 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.5), { steps: 20 });
    await wait(300);
  } catch (_) {}

  // Return to centre and settle
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
