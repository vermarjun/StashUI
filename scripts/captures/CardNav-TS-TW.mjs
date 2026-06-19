/**
 * Choreography: CardNav-TS-TW
 *
 * NAVBAR type: hover the hamburger to open; cards slide in.
 * Hover each expanded card link, then close the nav.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click the hamburger to expand the nav
  try {
    const ham = page.locator('.hamburger-menu').first();
    const box = await ham.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await page.mouse.click(W * 0.12, H * 0.06);
    }
    await wait(700); // cards animate in
  } catch (_) {}

  // 3. Hover card 0 (Products)
  try {
    const card0 = page.locator('.nav-card').nth(0);
    const b0 = await card0.boundingBox();
    if (b0) {
      await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2, { steps: 8 });
      await wait(500);
    }
  } catch (_) {}

  // 4. Hover card 1 (Resources)
  try {
    const card1 = page.locator('.nav-card').nth(1);
    const b1 = await card1.boundingBox();
    if (b1) {
      await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 10 });
      await wait(500);
    }
  } catch (_) {}

  // 5. Hover card 2 (Company)
  try {
    const card2 = page.locator('.nav-card').nth(2);
    const b2 = await card2.boundingBox();
    if (b2) {
      await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2, { steps: 10 });
      await wait(500);
    }
  } catch (_) {}

  // 6. Close nav — click hamburger again
  try {
    const ham = page.locator('.hamburger-menu').first();
    const box = await ham.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
    await wait(500);
  } catch (_) {}

  // 7. Return near top-center
  try { await page.mouse.move(W / 2, H * 0.04, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
