// Choreography for hexagon-videomasking
// A looping video clipped by a hexagon SVG mask — static mask, no pointer
// interaction. Strategy: settle, dwell at center, slow diagonal sweep, return.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the video element to be visible
  try {
    await page.locator('video').first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Settle so the autoplay video starts
  await wait(800);

  // Center mouse on the hexagon
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
  } catch (_) {}
  await wait(1100);

  // Slow diagonal sweep top-left to bottom-right across the hexagon interior
  try {
    const steps = 36;
    const x0 = W * 0.32;
    const y0 = H * 0.32;
    const x1 = W * 0.68;
    const y1 = H * 0.68;
    await page.mouse.move(x0, y0, { steps: 8 });
    for (let i = 1; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
      } catch (_) {}
      await wait(50);
    }
  } catch (_) {}

  // Dwell at bottom-right corner of hexagon
  await wait(900);

  // Reverse sweep bottom-right to center to end near origin
  try {
    const steps = 20;
    const x0 = W * 0.68;
    const y0 = H * 0.68;
    const x1 = W * 0.5;
    const y1 = H * 0.5;
    for (let i = 1; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
      } catch (_) {}
      await wait(35);
    }
  } catch (_) {}

  await wait(600);
}
