/**
 * Choreography: animate-grid
 * Behavior: 3D-perspective grid of emoji cards; hover a card → it scales up and
 *           glows, adjacent cards subtly lift. Dwell ~3 s to show the animation.
 */
export default async function choreography(page, { W, H }) {
  // Centre of the grid (max-w-md, centred inside the demo wrapper)
  const gridCx = W / 2;
  const gridCy = H / 2;

  // Card size is roughly equal-width cells across ~384 px (max-w-md) in a 4-col grid
  const cellW = 96;
  const cellH = 96;

  // Offset to the first card (top-left of the 4×4 grid, centred in the viewport)
  const gridLeft = gridCx - cellW * 2;
  const gridTop  = gridCy - cellH * 2;

  // Helper: centre of card at (col, row), 0-indexed
  const cardXY = (col, row) => ({
    x: gridLeft + col * cellW + cellW / 2,
    y: gridTop  + row * cellH + cellH / 2,
  });

  // Move into viewport first (no hover target)
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (_) {}

  // --- hover card (1,1) — middle-left area ---
  try {
    const { x, y } = cardXY(1, 1);
    await page.mouse.move(x, y, { steps: 20 });
    await page.waitForTimeout(3000); // dwell to watch glow + adjacent lift
    await page.mouse.move(W / 2, H / 2, { steps: 20 }); // leave card
    await page.waitForTimeout(400);
  } catch (_) {}

  // --- hover card (2,2) — centre ---
  try {
    const { x, y } = cardXY(2, 2);
    await page.mouse.move(x, y, { steps: 20 });
    await page.waitForTimeout(2500);
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
    await page.waitForTimeout(400);
  } catch (_) {}

  // --- hover card (0,3) — bottom-left corner ---
  try {
    const { x, y } = cardXY(0, 3);
    await page.mouse.move(x, y, { steps: 20 });
    await page.waitForTimeout(2000);
    // Return near start
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
  } catch (_) {}
}
