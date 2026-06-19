/**
 * Capture choreography for draggable-card.
 *
 * Effect: the card can be dragged freely. While dragging the card tilts in 3-D
 * (rotateX/rotateY spring). On release it bounces back with spring physics.
 * Strategy:
 *  1. Locate the card.
 *  2. Press mouse down on the card centre.
 *  3. Move in ~12 steps diagonally toward the bottom-right (drag).
 *  4. Release — card bounces back.
 *  5. Settle wait → move mouse off the card (resting state).
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // DraggableCardBody renders a motion.div with min-h-96 w-80
  const card = page.locator('[class*="min-h-96"]').first();

  let box;
  try {
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = { x: W / 2 - 160, y: H / 2 - 192, width: 320, height: 384 };
  }

  const { x, y, width, height } = box;
  const startX = x + width / 2;
  const startY = y + height / 2;

  await wait(700);

  // Hover briefly so the card reacts before drag
  try {
    await page.mouse.move(startX, startY);
    await wait(300);
  } catch { /* continue */ }

  // Press mouse button down
  try {
    await page.mouse.down();
    await wait(150);
  } catch { /* continue */ }

  // Drag diagonally bottom-right over ~12 steps
  const dragSteps = 12;
  const targetX = startX + 140;
  const targetY = startY + 80;
  try {
    for (let i = 1; i <= dragSteps; i++) {
      const t = i / dragSteps;
      await page.mouse.move(
        startX + (targetX - startX) * t,
        startY + (targetY - startY) * t,
      );
      await wait(40);
    }
    await wait(200);
  } catch { /* continue */ }

  // Release — spring bounce begins
  try {
    await page.mouse.up();
    await wait(900);
  } catch { /* continue */ }

  // Move mouse off the card to show resting state
  try {
    await page.mouse.move(W * 0.1, H * 0.1);
    await wait(500);
  } catch { /* continue */ }
}
