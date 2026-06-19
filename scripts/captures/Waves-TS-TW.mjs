/**
 * Capture choreography for Waves-TS-TW
 *
 * Waves renders vertical canvas lines that undulate via Perlin noise
 * (background wave) and additionally deflect toward the mouse cursor
 * (cursor physics: tension + friction spring per point). Moving the mouse
 * quickly creates a visible bow/bulge in the lines at the cursor position.
 *
 * Strategy:
 *   1. Settle 2 s for canvas + noise initialisation.
 *   2. Move mouse to canvas centre — initialises the mouse state (mouse.set).
 *   3. Dwell 3 s — the Perlin-wave background undulation is clearly visible
 *      across all lines.
 *   4. Quick horizontal swipe left→right — the cursor physics spring creates
 *      a wide bow across the vertical lines at mid-height.
 *   5. Slow diagonal sweep — a more organic distortion trail.
 *   6. Hold still at centre to show spring relaxation (lines return to noise).
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas + noise initialisation
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Initialise mouse state at centre
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — Perlin-wave background animates
  try {
    await wait(3000);
  } catch (_) {}

  // Fast horizontal swipe — creates spring bow in lines
  try {
    await page.mouse.move(Math.round(W * 0.1), cy, { steps: 4 });
    await page.mouse.move(Math.round(W * 0.9), cy, { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Slow diagonal sweep — organic distortion trail
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.3), { steps: 8 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.7), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Hold at centre — spring relaxes, lines return to noise
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(800);
  } catch (_) {}
}
