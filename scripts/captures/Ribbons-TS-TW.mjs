/**
 * Capture script: Ribbons-TS-TW
 * Choreography: WebGL OGL ribbons follow the cursor via spring physics.
 * Settle ~1.5s then sweep mouse in wide arcs so ribbons trail and swirl.
 * End near start so the GIF loops visually.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let OGL renderer and spring simulation initialise
  await page.waitForTimeout(1500);

  try {
    // Seed cursor at center
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 1 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('Ribbons: seed error', e.message);
  }

  try {
    // Wide clockwise arc: center → top → right → bottom
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 35 });
    await page.waitForTimeout(150);
    await page.mouse.move(W * 0.9, H * 0.5, { steps: 40 });
    await page.waitForTimeout(150);
    await page.mouse.move(W * 0.5, H * 0.9, { steps: 35 });
    await page.waitForTimeout(150);
  } catch (e) {
    console.warn('Ribbons: arc 1 error', e.message);
  }

  try {
    // Continue: bottom → left → center
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 35 });
    await page.waitForTimeout(150);
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 30 });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn('Ribbons: arc 2 error', e.message);
  }

  try {
    // Additional diagonal for extra ribbon swirl
    await page.mouse.move(W * 0.15, H * 0.2, { steps: 35 });
    await page.waitForTimeout(200);
    await page.mouse.move(W * 0.85, H * 0.8, { steps: 45 });
    await page.waitForTimeout(200);
    // Return near center
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 25 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.warn('Ribbons: diagonal error', e.message);
  }
}
