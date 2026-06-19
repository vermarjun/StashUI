/**
 * Capture choreography for squiggly-text.
 *
 * Behaviour: SVG feTurbulence displacement filters cycle at ~80ms steps,
 * creating a continuous wobbling/squiggly effect on the wrapped text.
 * Auto-playing from mount; no pointer interaction needed. Dwell 3s for
 * multiple wobble cycles to be visible. The effect is time-based (useTime)
 * so it starts immediately.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the squiggly wrapper (motion.span with inline-block)
  try {
    await page.waitForSelector('.inline-block', { timeout: 6000 });
  } catch { /* ignore */ }

  // Brief initial settle
  try {
    await wait(400);
  } catch { /* ignore */ }

  // Mouse at neutral centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Dwell for ~3s — captures many wobble cycles (80ms × ~37 steps per second)
  try {
    await wait(3000);
  } catch { /* ignore */ }

  // End near start
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(300);
  } catch { /* ignore */ }
}
