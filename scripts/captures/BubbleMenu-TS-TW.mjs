/**
 * Choreography: BubbleMenu-TS-TW
 *
 * MENU type: click the hamburger toggle to open, hover items, close again.
 * Layout: logo pill top-left, toggle button top-right (absolute inside 560-tall container).
 * On open, bubble pills scatter across the full container.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle after mount
  try { await wait(600); } catch (_) {}

  // 2. Click the hamburger toggle button (top-right area)
  try {
    const btn = page.locator('button[aria-label="Toggle menu"], button.toggle-bubble').first();
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      // fallback: top-right corner of component
      await page.mouse.click(W * 0.92, H * 0.08);
    }
    await wait(900); // wait for bubble animation
  } catch (_) {}

  // 3. Hover the first pill item (center of screen area)
  try {
    const link0 = page.locator('a.pill-link').nth(0);
    const b0 = await link0.boundingBox();
    if (b0) {
      await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2, { steps: 10 });
      await wait(500);
    }
  } catch (_) {}

  // 4. Hover second pill item
  try {
    const link1 = page.locator('a.pill-link').nth(1);
    const b1 = await link1.boundingBox();
    if (b1) {
      await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 10 });
      await wait(500);
    }
  } catch (_) {}

  // 5. Hover third pill item
  try {
    const link2 = page.locator('a.pill-link').nth(2);
    const b2 = await link2.boundingBox();
    if (b2) {
      await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2, { steps: 10 });
      await wait(500);
    }
  } catch (_) {}

  // 6. Close menu — click toggle again
  try {
    const btn = page.locator('button[aria-label="Toggle menu"], button.toggle-bubble').first();
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
    await wait(500);
  } catch (_) {}

  // 7. Return near start
  try { await page.mouse.move(W * 0.92, H * 0.08, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
