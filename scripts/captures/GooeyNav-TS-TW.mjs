/**
 * Choreography: GooeyNav-TS-TW
 *
 * MENU type: click each nav item to trigger the gooey particle explosion
 * and pill transition. Items are in a horizontal ul near the center.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(600); } catch (_) {}

  // 2. Click item 1 (About)
  try {
    const items = page.locator('nav ul li a');
    const item1 = items.nth(1);
    const b1 = await item1.boundingBox();
    if (b1) {
      await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(b1.x + b1.width / 2, b1.y + b1.height / 2);
      await wait(800); // particle animation
    }
  } catch (_) {}

  // 3. Click item 2 (Work)
  try {
    const items = page.locator('nav ul li a');
    const item2 = items.nth(2);
    const b2 = await item2.boundingBox();
    if (b2) {
      await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2, { steps: 10 });
      await wait(200);
      await page.mouse.click(b2.x + b2.width / 2, b2.y + b2.height / 2);
      await wait(800);
    }
  } catch (_) {}

  // 4. Click item 3 (Contact)
  try {
    const items = page.locator('nav ul li a');
    const item3 = items.nth(3);
    const b3 = await item3.boundingBox();
    if (b3) {
      await page.mouse.move(b3.x + b3.width / 2, b3.y + b3.height / 2, { steps: 10 });
      await wait(200);
      await page.mouse.click(b3.x + b3.width / 2, b3.y + b3.height / 2);
      await wait(800);
    }
  } catch (_) {}

  // 5. Return to item 0 (Home)
  try {
    const items = page.locator('nav ul li a');
    const item0 = items.nth(0);
    const b0 = await item0.boundingBox();
    if (b0) {
      await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2, { steps: 12 });
      await wait(200);
      await page.mouse.click(b0.x + b0.width / 2, b0.y + b0.height / 2);
      await wait(700);
    }
  } catch (_) {}
}
