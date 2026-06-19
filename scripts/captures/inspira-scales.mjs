/**
 * Choreography: inspira-scales
 * Behavior: CSS repeating-linear-gradient scales pattern rendered as a full-bleed
 *           diagonal hatching. Pure CSS — no animation engine to warm up. Park the
 *           cursor at center and dwell so the static pattern is captured cleanly.
 */
export default async function choreography(page, { W, H }) {
  // Move cursor to center so hover states (if any) don't skew the capture.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Short settle to let any React hydration complete.
  try {
    await page.waitForTimeout(800);
  } catch (_) {}

  // Gentle drift across the pattern to show its repeating nature.
  try {
    await page.mouse.move(W * 0.3, H * 0.35, { steps: 20 });
    await page.waitForTimeout(600);
    await page.mouse.move(W * 0.7, H * 0.65, { steps: 20 });
    await page.waitForTimeout(600);
  } catch (_) {}

  // Final dwell at center for a clean exit frame.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await page.waitForTimeout(1500);
  } catch (_) {}
}
