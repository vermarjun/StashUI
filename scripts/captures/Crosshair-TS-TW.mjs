/**
 * Capture script: Crosshair-TS-TW
 * Choreography: move the mouse in wide arcs across the viewport so the
 * lerp-smoothed crosshair lines lag behind and visibly track the cursor.
 * End roughly near center so lines cross symmetrically.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Initial settle — move to center first to make crosshair visible
  await page.waitForTimeout(500);

  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 1 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('Crosshair: initial position error', e.message);
  }

  try {
    // Arc 1: center → top-right
    await page.mouse.move(W * 0.85, H * 0.15, { steps: 50 });
    await page.waitForTimeout(250);
    // Arc 2: top-right → bottom-left
    await page.mouse.move(W * 0.15, H * 0.8, { steps: 60 });
    await page.waitForTimeout(250);
  } catch (e) {
    console.warn('Crosshair: arc 1-2 error', e.message);
  }

  try {
    // Arc 3: bottom-left → top-left
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 40 });
    await page.waitForTimeout(200);
    // Arc 4: top-left → center-right
    await page.mouse.move(W * 0.8, H * 0.5, { steps: 50 });
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('Crosshair: arc 3-4 error', e.message);
  }

  try {
    // Return to center
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 30 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.warn('Crosshair: return error', e.message);
  }
}
