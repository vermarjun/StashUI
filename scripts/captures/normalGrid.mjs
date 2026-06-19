/**
 * Capture choreography for normalGrid (ui-layouts)
 *
 * NormalGrid renders 4 project cards in a 2-column masonry (CSS columns).
 * Each card has a Framer Motion whileInView entrance (y: 50→0, opacity 0→1).
 * Cards show a title badge and arrow icon overlay on top of a full-bleed image.
 * No click or filter interaction — layout is static after entrance.
 *
 * Strategy:
 *   1. Wait ~800ms for images and entrance animations to settle.
 *   2. Slow scroll down through the grid so all 4 cards animate in view.
 *   3. Hover over each card pair so the arrow overlay is visible.
 *   4. Scroll back to top for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let images load and entrance animations fire
  try {
    await wait(800);
  } catch (_) {}

  // Hover over first card (top-left)
  try {
    const articles = page.locator('article');
    const box0 = await articles.nth(0).boundingBox();
    if (box0) {
      await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // Scroll down slowly to reveal lower cards and trigger whileInView
  try {
    await page.mouse.wheel(0, 220);
    await wait(500);
  } catch (_) {}

  // Hover over third card (bottom-left area after scroll)
  try {
    const articles = page.locator('article');
    const box2 = await articles.nth(2).boundingBox();
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // Hover over fourth card
  try {
    const articles = page.locator('article');
    const box3 = await articles.nth(3).boundingBox();
    if (box3) {
      await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // Scroll back to top for loop seam
  try {
    await page.mouse.wheel(0, -220);
    await wait(500);
    await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
