/**
 * Capture choreography for canvas-text.
 *
 * Behaviour: A <canvas> element renders the text clipped by animated bezier
 * curve stripes cycling through a colour palette. The animation runs via
 * requestAnimationFrame at a 5s period. Canvas-based rendering may appear
 * blank under headless Chromium; orchestrator falls back to a static frame
 * if blank. Strategy: settle for 1s while colors resolve and ResizeObserver
 * fires, then dwell 3s to show stripe colour cycling.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the canvas to appear in the DOM
  try {
    await page.waitForSelector('canvas', { timeout: 8000 });
  } catch { /* ignore */ }

  // Settle — colors/font dimensions are resolved asynchronously
  try {
    await wait(1200);
  } catch { /* ignore */ }

  // Move mouse to neutral centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Dwell for 3s to capture animated stripe cycling
  try {
    await wait(3000);
  } catch { /* ignore */ }

  // Return near start
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(300);
  } catch { /* ignore */ }
}
