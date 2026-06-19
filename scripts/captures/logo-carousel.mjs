/**
 * Capture choreography: logo-carousel (cult-ui)
 *
 * Two columns of logos that cycle through 14 brand SVGs. Each column swaps its
 * logo every 2000 ms via a setInterval tick (100 ms granularity), with a
 * 200 ms stagger per column index.  Logos animate in/out with blur + y-spring.
 * No user interaction required — this is a passive cycling display.
 *
 * Strategy:
 *   1. Wait for column containers to mount and initial logos to appear.
 *   2. Park mouse off the component so no hover effects trigger.
 *   3. Dwell ~6 s to capture at least two full swap cycles per column.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for at least one logo SVG to be visible
  try {
    await page.locator("svg").first().waitFor({ state: "visible", timeout: 8000 });
  } catch {
    await wait(1500);
  }

  // Let column entrance animations finish (staggered 0.1 s × 2 cols + 0.5 s duration)
  await wait(900);

  // Park mouse in a neutral position
  try {
    await page.mouse.move(W * 0.5, H * 0.05);
  } catch (_) {}

  // Dwell: 2 s per swap × 3 cycles = 6 s per column
  await wait(6000);
}
