/**
 * Capture script: PixelTransition-TS-TW
 * Choreography: hover the card so the pixel-scramble transition reveals the
 * second content, wait for animation to complete, move away so it reverses,
 * then repeat once more for a satisfying loop.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await page.waitForTimeout(600);

  let box;
  try {
    const card = page.locator('.relative.overflow-hidden.rounded-\\[15px\\]').first();
    await card.waitFor({ state: 'visible', timeout: 6000 });
    box = await card.boundingBox();
  } catch (e) {
    console.warn('PixelTransition: card not found, using viewport center', e.message);
    box = { x: W * 0.35, y: H * 0.2, width: W * 0.3, height: H * 0.6 };
  }

  const cx = (box?.x ?? W * 0.35) + (box?.width ?? W * 0.3) / 2;
  const cy = (box?.y ?? H * 0.2) + (box?.height ?? H * 0.6) / 2;
  const outside = { x: W * 0.05, y: H * 0.05 };

  // --- Round 1 ---
  try {
    // Hover card → trigger pixel transition forward
    await page.mouse.move(cx, cy, { steps: 15 });
    await page.waitForTimeout(900); // animation step ≈ 0.4s × 2
  } catch (e) {
    console.warn('PixelTransition: hover-in error', e.message);
  }

  try {
    // Move away → trigger pixel transition reverse
    await page.mouse.move(outside.x, outside.y, { steps: 15 });
    await page.waitForTimeout(900);
  } catch (e) {
    console.warn('PixelTransition: hover-out error', e.message);
  }

  // --- Round 2 ---
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await page.waitForTimeout(900);
  } catch (e) {
    console.warn('PixelTransition: round2 hover-in error', e.message);
  }

  try {
    // End away from card so the component is back to its initial state
    await page.mouse.move(outside.x, outside.y, { steps: 15 });
    await page.waitForTimeout(600);
  } catch (e) {
    console.warn('PixelTransition: round2 hover-out error', e.message);
  }
}
