/**
 * Capture script: MetaBalls-TS-TW
 * Choreography: WebGL gooey metaballs — wait for shader to settle (~2s),
 * then move the cursor ball slowly through the cluster so blobs merge and
 * separate. Dwell ~3s at various positions. End near center.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Locate the MetaBalls container and find its bounds
  let box;
  try {
    const el = page.locator('.w-full.max-w-lg').first();
    await el.waitFor({ state: 'visible', timeout: 8000 });
    box = await el.boundingBox();
  } catch (e) {
    console.warn('MetaBalls: container not found', e.message);
    box = { x: W * 0.25, y: H * 0.1, width: W * 0.5, height: H * 0.8 };
  }

  const cx = (box?.x ?? W * 0.25) + (box?.width ?? W * 0.5) / 2;
  const cy = (box?.y ?? H * 0.1) + (box?.height ?? H * 0.8) / 2;

  // Let WebGL shader warm up
  await page.waitForTimeout(2000);

  try {
    // Drift cursor through the metaball cluster
    await page.mouse.move(cx, cy, { steps: 1 });
    await page.waitForTimeout(400);

    await page.mouse.move(cx - 80, cy - 60, { steps: 30 });
    await page.waitForTimeout(800);

    await page.mouse.move(cx + 90, cy + 40, { steps: 35 });
    await page.waitForTimeout(800);

    await page.mouse.move(cx - 50, cy + 70, { steps: 30 });
    await page.waitForTimeout(800);
  } catch (e) {
    console.warn('MetaBalls: mouse drift error', e.message);
  }

  // Dwell at final position
  try {
    await page.waitForTimeout(1000);
    // Return to center
    await page.mouse.move(cx, cy, { steps: 20 });
    await page.waitForTimeout(600);
  } catch (e) {
    console.warn('MetaBalls: dwell/return error', e.message);
  }
}
