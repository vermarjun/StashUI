/**
 * Capture choreography for liquid-glass
 *
 * LiquidGlassCard is a draggable glassmorphism container with backdrop-blur,
 * SVG fractal-noise distortion, inner shadow highlights, and motion hover/drag.
 * whileHover scale: 1.01; drag elastic: 0.3 with spring bounce-back.
 *
 * Strategy:
 *   1. Settle at card centre — let glass render.
 *   2. Slow pointer drift across the card to show the distortion field shift.
 *   3. Drag the card a short distance — elastic spring snaps it back.
 *   4. Final slow drift horizontally, return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Settle
  try {
    await wait(500);
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Slow drift left-to-right across the glass card surface
  try {
    await page.mouse.move(cx - 100, cy - 30, { steps: 8 });
    await wait(200);
    await page.mouse.move(cx + 100, cy + 30, { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Drag the card — elastic spring will snap it back on release
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(150);
    await page.mouse.down();
    await wait(100);
    await page.mouse.move(cx + 40, cy - 30, { steps: 18 });
    await wait(300);
    await page.mouse.up();
    await wait(600); // spring bounce-back
  } catch (_) {}

  // Diagonal drift bottom-left to top-right
  try {
    await page.mouse.move(cx - 80, cy + 60, { steps: 30 });
    await wait(300);
    await page.mouse.move(cx + 80, cy - 60, { steps: 35 });
    await wait(400);
  } catch (_) {}

  // Return to centre — resting frame
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(500);
  } catch (_) {}
}
