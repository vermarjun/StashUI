/**
 * Capture script: PixelTrail-TS-TW
 * Choreography: drag the mouse in wide sweeping arcs across the canvas so the
 * pixel-dot trail paints clearly visible paths. End near the start so the
 * oldest trail has faded and the GIF loops cleanly.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await page.waitForTimeout(600);

  try {
    // Start top-left, sweep diagonally to bottom-right
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 1 });
    await page.waitForTimeout(100);
    await page.mouse.move(W * 0.9, H * 0.85, { steps: 60 });
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('PixelTrail: sweep 1 error', e.message);
  }

  try {
    // Arc back: bottom-right → top-center
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 50 });
    await page.waitForTimeout(200);
    // Sweep: top-center → bottom-left
    await page.mouse.move(W * 0.1, H * 0.85, { steps: 55 });
    await page.waitForTimeout(200);
  } catch (e) {
    console.warn('PixelTrail: sweep 2 error', e.message);
  }

  try {
    // Final arc back to start region (top-left) so trail fades out cleanly
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 40 });
    await page.waitForTimeout(500);
  } catch (e) {
    console.warn('PixelTrail: return arc error', e.message);
  }
}
