/**
 * Choreography: inspira-warp-background
 * Behavior: Perspective-3D warp grid with animated Framer-Motion light beams
 *           shooting upward from all four sides. Beams have random delays
 *           0–3 s and a 4 s duration. Allow ~1 s settle for React hydration
 *           and initial beam stagger, then dwell ~4 s so beams from all sides
 *           are visible mid-travel.
 */
export default async function choreography(page, { W, H }) {
  // Park cursor at center to avoid obscuring the grid or beams.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Settle: React hydration + useMemo beam generation + Framer-Motion mount.
  try {
    await page.waitForTimeout(1000);
  } catch (_) {}

  // Dwell through at least one full beam cycle from each side.
  try {
    await page.waitForTimeout(4000);
  } catch (_) {}

  // Small drift to reveal the 3-D perspective of the grid.
  try {
    await page.mouse.move(W * 0.4, H * 0.45, { steps: 18 });
    await page.waitForTimeout(600);
    await page.mouse.move(W * 0.6, H * 0.55, { steps: 18 });
    await page.waitForTimeout(600);
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await page.waitForTimeout(800);
  } catch (_) {}
}
