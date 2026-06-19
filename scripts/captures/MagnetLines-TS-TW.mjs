/**
 * Capture script: MagnetLines-TS-TW
 * Choreography: move the mouse across the grid in a slow diagonal sweep so
 * all the line sticks rotate toward the cursor, revealing the magnetic field
 * effect clearly before the cursor returns near center.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the grid to mount and render
  await page.waitForTimeout(600);

  try {
    // Slow diagonal sweep: top-left → bottom-right
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 1 });
    await page.waitForTimeout(100);
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 40 });
    await page.waitForTimeout(300);
    await page.mouse.move(W * 0.9, H * 0.85, { steps: 40 });
    await page.waitForTimeout(300);
  } catch (e) {
    console.warn('MagnetLines: sweep error', e.message);
  }

  try {
    // Arc back across: right → left at mid-height
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 40 });
    await page.waitForTimeout(200);
    await page.mouse.move(W * 0.1, H * 0.5, { steps: 40 });
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('MagnetLines: return arc error', e.message);
  }

  try {
    // End near center so lines settle pointing inward symmetrically
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 20 });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn('MagnetLines: settle error', e.message);
  }
}
