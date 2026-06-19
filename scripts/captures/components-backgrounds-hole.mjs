/**
 * Capture choreography for: components-backgrounds-hole
 * Behaviour: canvas-based black-hole animation — concentric discs tunnel toward
 * a vanishing point, converging line spokes, and upward-drifting white
 * particles. Fully autonomous; no pointer interaction needed. Dwell long enough
 * to show disc motion + at least one full particle rise cycle (~3 s).
 */
export default async function capture(page, { W, H, wait }) {
  // Let the canvas mount and the rAF loop start
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  // Initial settle: disc positions initialise on first frames
  try {
    await wait(500);
  } catch (_) {}

  // Park mouse away from centre so it doesn't obscure the tunnel
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 6 });
  } catch (_) {}

  // Dwell phase 1: disc tunneling is visibly moving
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell phase 2: particles have risen and reset at least once
  try {
    await wait(1500);
  } catch (_) {}
}
