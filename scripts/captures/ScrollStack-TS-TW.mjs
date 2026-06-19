/**
 * Capture script: ScrollStack-TS-TW
 * Choreography: wheel down so cards stack/pin progressively, then scroll back to top.
 */
export default async function capture({ page, W, H }) {
  await page.waitForTimeout(700);

  // Locate the scroll container
  let scroller;
  try {
    scroller = await page.locator('.scroll-stack-inner').first();
    await scroller.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('ScrollStack: scroll-stack-inner not found', e.message);
    return;
  }

  const box = await scroller.boundingBox();
  const targetX = box ? box.x + box.width / 2 : W / 2;
  const targetY = box ? box.y + box.height / 2 : H / 2;

  try {
    // Focus the scroll area
    await page.mouse.move(targetX, targetY);
    await page.waitForTimeout(200);

    // Scroll down in steps to let each card pin
    const steps = 6;
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(500);
    }

    // Brief pause at stacked state
    await page.waitForTimeout(800);

    // Scroll back to top
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, -400);
      await page.waitForTimeout(400);
    }

    await page.waitForTimeout(600);
  } catch (e) {
    console.warn('ScrollStack: scroll choreography error', e.message);
  }
}
