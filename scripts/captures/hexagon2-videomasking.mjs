// Choreography for hexagon2-videomasking
// A looping video clipped by a hexagon2 SVG mask — static mask, no pointer
// interaction. Strategy: settle so the video starts, dwell to show the masked
// motion, then a very slow circular mouse drift around the hexagon center.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the video to mount
  try {
    await page.locator('video').first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Settle: allow autoplay video to start rendering
  await wait(800);

  // Place mouse at center of the hexagon
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
  } catch (_) {}
  await wait(1000);

  // Slow clockwise orbit around the hexagon center to showcase shape edges
  try {
    const cx = W * 0.5;
    const cy = H * 0.5;
    const rx = W * 0.18;
    const ry = H * 0.18;
    const steps = 48;
    for (let i = 0; i <= steps; i++) {
      try {
        const angle = (i / steps) * Math.PI * 2;
        await page.mouse.move(cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry);
      } catch (_) {}
      await wait(42);
    }
  } catch (_) {}

  // Dwell after orbit so video motion plays through
  await wait(1000);

  // Return to center for a clean loop
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 14 });
  } catch (_) {}
  await wait(500);
}
