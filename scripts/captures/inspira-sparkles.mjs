/**
 * Choreography: inspira-sparkles
 * Behavior: Canvas particle field. Particles start immediately and drift slowly
 *           with sinusoidal opacity (phaseSpeed=0.015). No settle needed beyond
 *           React hydration. Dwell ~3 s so the opacity-pulsing sparkles are
 *           clearly visible across multiple phase cycles.
 */
export default async function choreography(page, { W, H }) {
  // Move to center to avoid accidental hover effects.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Short settle for React hydration and first RAF tick.
  try {
    await page.waitForTimeout(600);
  } catch (_) {}

  // Dwell to let sparkle opacity cycles become visible (one full phase ~420 ms
  // at phaseSpeed=0.015 × 60 fps → ~3.5 cycles in 3 s).
  try {
    await page.waitForTimeout(3000);
  } catch (_) {}

  // Gentle drift to confirm particles fill the entire canvas.
  try {
    await page.mouse.move(W * 0.2, H * 0.3, { steps: 18 });
    await page.waitForTimeout(500);
    await page.mouse.move(W * 0.8, H * 0.7, { steps: 18 });
    await page.waitForTimeout(500);
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await page.waitForTimeout(800);
  } catch (_) {}
}
