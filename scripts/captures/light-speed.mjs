/**
 * Capture choreography for light-speed.
 *
 * Effect: WebGL hyperspace/light-speed highway with turbulent lane distortion.
 * The effect auto-plays; clicking accelerates it. Headless WebGL may be blank —
 * orchestrator will fall back automatically.
 *
 * Strategy:
 *   1. Settle ~2 s — WebGL scene loads, car-light streaks appear, lane lights
 *      pulse into view.
 *   2. Dwell a further ~3 s at frame centre so the streaking animation is fully
 *      captured.
 *   3. Brief slow pointer drift across the frame (adds visual life / shows
 *      the "Click & hold" label clearly).
 *   4. Return to centre for clean loop.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle — WebGL init, shader compile, first frames render
  try { await wait(2000); } catch (_) {}

  // Park mouse near centre (shows "Click & hold" label)
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}

  // Dwell so streaks are fully visible
  try { await wait(3000); } catch (_) {}

  // Gentle drift left to right — keeps capture lively
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.55), { steps: 20 });
    await wait(500);
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.45), { steps: 30 });
    await wait(500);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(400);
  } catch (_) {}
}
