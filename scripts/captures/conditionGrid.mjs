/**
 * Capture choreography for conditionGrid (ui-layouts)
 *
 * ConditionGrid renders 4 project cards in a responsive 12-column CSS grid
 * with asymmetric column spans (5/7 then 7/5). Each card has a Framer Motion
 * whileInView entrance and shows a title badge + arrow icon overlay.
 * No click/filter interaction — layout is static after entrance.
 *
 * Strategy:
 *   1. Wait ~800ms for images and entrance animations to settle.
 *   2. Hover over the first (wide) card and the second (wider) card on row 1.
 *   3. Scroll down to reveal the second row of cards and let them animate in.
 *   4. Hover over the third and fourth card.
 *   5. Scroll back to top for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let images load and first-row entrance animations fire
  try {
    await wait(800);
  } catch (_) {}

  // Hover first card (col-span-5, left side)
  try {
    const articles = page.locator('article');
    const box0 = await articles.nth(0).boundingBox();
    if (box0) {
      await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // Hover second card (col-span-7, right side)
  try {
    const articles = page.locator('article');
    const box1 = await articles.nth(1).boundingBox();
    if (box1) {
      await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // Scroll down to bring second row into view
  try {
    await page.mouse.wheel(0, 240);
    await wait(550);
  } catch (_) {}

  // Hover third card (col-span-7)
  try {
    const articles = page.locator('article');
    const box2 = await articles.nth(2).boundingBox();
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // Hover fourth card (col-span-5)
  try {
    const articles = page.locator('article');
    const box3 = await articles.nth(3).boundingBox();
    if (box3) {
      await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2, { steps: 10 });
      await wait(400);
    }
  } catch (_) {}

  // Scroll back to top for clean loop seam
  try {
    await page.mouse.wheel(0, -240);
    await wait(500);
    await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
