/**
 * Capture choreography for Masonry-TS-TW (react-bits)
 *
 * The Masonry component places 6 image tiles in an absolute-positioned GSAP
 * layout with scaleOnHover=true. On mount all tiles animate in from the
 * bottom with a blur-to-focus stagger. scaleOnHover slightly shrinks tiles
 * on mouseenter.
 *
 * Strategy:
 *   1. Wait ~900ms for images to load and entrance animation to finish.
 *   2. Scroll gently downward so the full column height is visible.
 *   3. Sweep the mouse over tiles 0, 2, 4 (across columns) to trigger
 *      the scale hover effect.
 *   4. Scroll back to the top so the loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for images to preload and GSAP entrance to complete
  try {
    await wait(900);
  } catch (_) {}

  // Scroll down gently to reveal the lower tiles
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 5 });
    await page.mouse.wheel(0, 280);
    await wait(600);
  } catch (_) {}

  // Hover over tile 0 (first image by background-image order)
  try {
    const tiles = page.locator('[data-key]');
    const box0 = await tiles.nth(0).boundingBox();
    if (box0) {
      await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2, { steps: 12 });
      await wait(450);
    }
  } catch (_) {}

  // Hover over tile 2
  try {
    const tiles = page.locator('[data-key]');
    const box2 = await tiles.nth(2).boundingBox();
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 12 });
      await wait(450);
    }
  } catch (_) {}

  // Hover over tile 4
  try {
    const tiles = page.locator('[data-key]');
    const box4 = await tiles.nth(4).boundingBox();
    if (box4) {
      await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2, { steps: 12 });
      await wait(450);
    }
  } catch (_) {}

  // Move mouse away from any tile
  try {
    await page.mouse.move(W * 0.5, H * 0.05, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Scroll back to top for a clean loop seam
  try {
    await page.mouse.wheel(0, -280);
    await wait(400);
  } catch (_) {}
}
