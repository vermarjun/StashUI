/**
 * Capture choreography for GridScan-TS-TW
 *
 * GridScan renders a THREE.js shader that draws a perspective grid and sweeps
 * a glowing scan line across it. The scan animates automatically (no click
 * required unless scanOnClick is true — the demo uses defaults, so it sweeps
 * continuously). Mouse movement slightly skews the grid via uSkew.
 *
 * Strategy:
 *   1. Longer settle (~2 s) for THREE.js context + shader compilation.
 *   2. Gentle mouse drift diagonally so the grid skews subtly.
 *   3. Dwell ~3 s to show at least one full scan pass.
 *   4. Return mouse to centre for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL context + shader compile settle
  try {
    await wait(2000);
  } catch (_) {}

  // Drift mouse from centre toward top-right — skews the grid gently
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
    await wait(150);
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.35), { steps: 50 });
    await wait(400);
  } catch (_) {}

  // Slow arc toward bottom-left
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.65), { steps: 60 });
    await wait(400);
  } catch (_) {}

  // Dwell at bottom-left during scan sweep
  try {
    await wait(2000);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 30 });
    await wait(600);
  } catch (_) {}
}
