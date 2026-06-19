/**
 * Choreography: bg-falling-stars
 * Behavior: Canvas-based 3D starfield — 200 stars with perspective projection
 *           and trail glow, flying toward the viewer. Fully automatic; no
 *           pointer interaction. Strategy: short settle (~1 s) then dwell ~3 s
 *           to capture the continuous tunnel-rush of stars.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow the canvas to resize, stars to initialise, and the RAF loop to start.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Stars render immediately — only need a short settle.
  try { await wait(1000); } catch (_) {}

  // Park cursor at centre (does not affect rendering).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
  } catch (_) {}

  // Dwell: let several dozen frames render so the star trails are clearly visible.
  try { await wait(3000); } catch (_) {}

  try { await wait(500); } catch (_) {}
}
