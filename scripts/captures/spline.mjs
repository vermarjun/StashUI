/**
 * Capture choreography for spline
 *
 * The Spline component lazy-loads @splinetool/runtime and fetches the scene
 * from prod.spline.design — a WebGL asset from the network. Load time can be
 * 2–4 s. The demo scene (6Wq1Q7YGyM-iab9i) typically reacts to pointer move.
 * Even if the scene hasn't loaded within the settle window the loading
 * placeholder renders cleanly and still records as a useful preview.
 * Strategy:
 *   1. Long settle ~3 s for the Spline runtime download + scene load.
 *   2. Gentle mouse drift across the canvas — Spline scenes often track the
 *      pointer (parallax, object follow, hover states).
 *   3. Slow arc left→right→centre so the motion is visible.
 *   4. End near centre for the loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow Spline runtime + scene to load from network
  try { await wait(3000); } catch (_) {}

  // Gentle drift — start left-centre
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.5), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Slow sweep right across the scene
  try {
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.45), { steps: 22 });
    await wait(600);
  } catch (_) {}

  // Drift up a little
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.35), { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 16 });
    await wait(600);
  } catch (_) {}
}
