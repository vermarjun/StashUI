/**
 * Choreography: number-ticker (inspira-number-ticker)
 * Behavior: Three counters animate on mount (IntersectionObserver / useInView):
 *   • 0 → 1,234,567   (count up,   duration 2000 ms)
 *   • 99.99 → 0       (count down, duration 2000 ms)
 *   • 0 → 3.14159     (count up,   duration 1500 ms)
 *   Longest: 2000 ms. All complete before ~2.5 s from mount.
 * Strategy: park mouse away, dwell ~3 s to let all three finish and rest on
 *           their final values so the completed state is clearly visible.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse away from counters so no hover artifact appears
  try {
    await page.mouse.move(W * 0.9, H * 0.9, { steps: 6 });
  } catch (_) {}

  // Settle — counters start immediately on viewport entry
  try {
    await wait(300);
  } catch (_) {}

  // Dwell ~3 s — all three counters settle well within this window
  try {
    await wait(3000);
  } catch (_) {}

  // Return near top-left for loop seam
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 8 });
    await wait(200);
  } catch (_) {}
}
