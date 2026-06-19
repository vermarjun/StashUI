/**
 * Choreography: StickerPeel-TS-TW
 * Behavior: drag the sticker corner to peel, release to spring back.
 * Strategy: hover sticker center (triggers hover peel CSS), then simulate a
 *   mousedown + drag toward bottom-right, dwell to show peel, then release.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  // Sticker is centered in the preview frame
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    // 1. Let mount animation settle
    await page.waitForTimeout(600);

    // 2. Hover to trigger CSS peel-back-hover state
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(500);

    // 3. Mousedown on sticker (grab)
    await page.mouse.move(cx, cy - 30);
    await page.mouse.down();
    await page.waitForTimeout(200);

    // 4. Drag diagonally – pulling top-left corner away to emphasize peel
    const steps = 20;
    const dragEndX = cx - 60;
    const dragEndY = cy + 80;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        Math.round(cx - 30 + (dragEndX - (cx - 30)) * t),
        Math.round(cy - 30 + (dragEndY - (cy - 30)) * t)
      );
      await page.waitForTimeout(30);
    }

    // 5. Dwell mid-drag to capture peel
    await page.waitForTimeout(600);

    // 6. Screenshot mid-drag (peel visible)
    await screenshot('peel-drag');

    // 7. Release – sticker springs back
    await page.mouse.up();
    await page.waitForTimeout(800);

    // 8. Return mouse near start
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(300);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[StickerPeel choreograph]', err?.message ?? err);
  }
}
