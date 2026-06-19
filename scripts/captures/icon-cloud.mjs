// icon-cloud: 3D rotating canvas sphere of icons. Auto-rotates toward the
// mouse; drag spins it. Wait for icon images to load then do a slow drag.
// Canvas/WebGL may not render headless — orchestrator falls back for blanks.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: allow canvas init + image loads (cross-origin via simpleicons CDN).
  try { await wait(1500); } catch (_) {}

  // Locate the canvas and get its bounding box.
  let box;
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 4000 });
    box = await canvas.boundingBox();
  } catch (_) {}

  if (!box) {
    // Fallback: use viewport centre approximation.
    box = { x: W * 0.25, y: H * 0.25, width: W * 0.5, height: H * 0.5 };
  }

  const cx = Math.round(box.x + box.width / 2);
  const cy = Math.round(box.y + box.height / 2);

  // Hover over center — auto-rotation steers toward mouse.
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(800);
  } catch (_) {}

  // Slow drag left → right to spin the cloud.
  try {
    await page.mouse.move(cx - Math.round(box.width * 0.3), cy, { steps: 8 });
    await page.mouse.down();
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(
        cx - Math.round(box.width * 0.3) + Math.round(box.width * 0.6 * (i / steps)),
        cy,
        { steps: 1 }
      );
      await wait(40);
    }
    await page.mouse.up();
  } catch (_) {}

  // Dwell to let it continue auto-rotating.
  try { await wait(1200); } catch (_) {}

  // Return mouse to center.
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(400);
  } catch (_) {}
}
