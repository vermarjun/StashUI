// Choreography for splashwater-videomasking
// A looping video clipped by a splash/water SVG mask — static mask, no pointer
// interaction. Strategy: settle so the video starts playing, then a slow mouse
// drift across the masked region so the viewer can appreciate the motion, then
// return near start for a clean loop seam.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the video element to mount and the SVG mask file to load
  try {
    await page.locator('video').first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Settle: give the autoplay video ~800ms to begin painting frames
  await wait(800);

  // Move mouse to the center of the masked video area and dwell
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
  } catch (_) {}
  await wait(1000);

  // Slow horizontal drift left-to-right across the splash shape center band
  try {
    const steps = 40;
    const startX = W * 0.28;
    const endX = W * 0.72;
    const y = H * 0.50;
    await page.mouse.move(startX, y, { steps: 8 });
    for (let i = 1; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(startX + (endX - startX) * t, y + Math.sin(t * Math.PI) * H * 0.04);
      } catch (_) {}
      await wait(45);
    }
  } catch (_) {}

  // Dwell at center-right so video motion is visible through the mask
  await wait(1200);

  // Gentle drift back toward center to end near start position
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 18 });
  } catch (_) {}
  await wait(600);
}
