/**
 * Capture choreography for colourful-text.
 *
 * Behaviour: Each character is wrapped in a motion.span that animates its
 * color, y-offset, scale, blur, and opacity on a 5s setInterval. The initial
 * animation fires immediately on mount with staggered per-character delays
 * (~0.05s × char count). Demo text "Hello World" = 11 chars → full initial
 * sweep ~0.55s. Dwell 3s to catch the colour-cycling animation cycle.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the heading with ColourfulText to render
  try {
    await page.waitForSelector('h1', { timeout: 6000 });
  } catch { /* ignore */ }

  // Let the initial per-character animations complete
  try {
    await wait(800);
  } catch { /* ignore */ }

  // Move mouse to centre (neutral position)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Dwell to show vibrant colors cycling (~3s)
  try {
    await wait(3000);
  } catch { /* ignore */ }

  // Return to near-start for a clean loop
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(300);
  } catch { /* ignore */ }
}
