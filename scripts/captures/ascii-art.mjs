/**
 * Capture choreography for ascii-art.
 *
 * Effect: images are rendered as animated ASCII on canvas. Two panels:
 *   Left  — "matrix" reveal style (green rain → resolves to greyscale chars).
 *   Right — "fade" style with colored blocks.
 * Both animate once on mount (animateOnView). Strategy:
 *   1. Settle ~1500 ms for images to decode and the matrix animation to start.
 *   2. Let matrix rain play (~2 s more).
 *   3. Dwell at centre so both panels are visible side by side.
 *   4. Move mouse across left panel slowly (ASCII art does not react to cursor
 *      but it shows the render clearly).
 *   5. Drift to right panel and dwell.
 *   6. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Approximate panel centres (two panels, each ~340 px wide, gap-8 between)
  const leftCx  = Math.round(W * 0.32);
  const rightCx = Math.round(W * 0.68);
  const cy      = Math.round(H * 0.48);

  // Settle for image decode
  try { await wait(1500); } catch (_) {}

  // Let matrix animation play
  try { await wait(2000); } catch (_) {}

  // Dwell at centre
  try {
    await page.mouse.move(Math.round(W * 0.5), cy, { steps: 10 });
    await wait(600);
  } catch (_) {}

  // Slow drift across left panel
  try {
    await page.mouse.move(leftCx - 80, cy - 50, { steps: 12 });
    await wait(350);
    await page.mouse.move(leftCx + 80, cy + 40, { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Drift to right panel
  try {
    await page.mouse.move(rightCx, cy, { steps: 16 });
    await wait(700);
  } catch (_) {}

  // Slow drift across right panel
  try {
    await page.mouse.move(rightCx - 70, cy - 40, { steps: 12 });
    await wait(350);
    await page.mouse.move(rightCx + 70, cy + 40, { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), cy, { steps: 14 });
    await wait(400);
  } catch (_) {}
}
