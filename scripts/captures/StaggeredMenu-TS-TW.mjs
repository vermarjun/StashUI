/**
 * Choreography: StaggeredMenu-TS-TW
 *
 * MENU type: click the "Menu" toggle (top-right) to open the slide-in panel,
 * hover each nav item, then close. Ends near the initial state.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(600); } catch (_) {}

  // 2. Click the toggle button to open
  try {
    const toggle = page.locator('button[aria-label="Open menu"], button.sm-toggle').first();
    const box = await toggle.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W * 0.88, H * 0.07);
    }
    await wait(1000); // staggered items animate in
  } catch (_) {}

  // 3. Hover nav item 0 (Home)
  try {
    const item0 = page.locator('.sm-panel-item').nth(0);
    const b0 = await item0.boundingBox();
    if (b0) {
      await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // 4. Hover nav item 1 (Work)
  try {
    const item1 = page.locator('.sm-panel-item').nth(1);
    const b1 = await item1.boundingBox();
    if (b1) {
      await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // 5. Hover nav item 2 (About)
  try {
    const item2 = page.locator('.sm-panel-item').nth(2);
    const b2 = await item2.boundingBox();
    if (b2) {
      await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2, { steps: 10 });
      await wait(450);
    }
  } catch (_) {}

  // 6. Close menu — click toggle again
  try {
    const toggle = page.locator('button[aria-label="Close menu"], button.sm-toggle').first();
    const box = await toggle.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W * 0.88, H * 0.07);
    }
    await wait(500);
  } catch (_) {}

  // 7. Return to toggle button position
  try { await page.mouse.move(W * 0.88, H * 0.07, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
