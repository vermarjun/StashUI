/**
 * Capture choreography for Orb-TS-TW
 *
 * Orb is a WebGL glowing orb that responds to hover (rotates / brightens when
 * the cursor is over it). The demo wraps it in a 400×400 box centred on a
 * 500 px-tall container. rotateOnHover is true with hoverIntensity 0.3.
 *
 * Strategy:
 *   1. Settle ~2.5 s for WebGL init and initial pulse animation.
 *   2. Drift cursor onto the orb centre to trigger rotateOnHover.
 *   3. Gentle circular drift around the orb centre (~2 full loops, slow).
 *   4. Return to orb centre and dwell ~1 s — orb glows at hover peak.
 *   5. Move cursor slightly off-centre to show the hover-off fade.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);
  const r = Math.round(Math.min(W, H) * 0.15); // orbit radius around orb

  // WebGL settle
  try {
    await wait(2500);
  } catch (_) {}

  // Move onto the orb to trigger hover
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(500);
  } catch (_) {}

  // Slow clockwise drift around orb — 2 loops, 36 steps each
  for (let loop = 0; loop < 2; loop++) {
    try {
      for (let i = 0; i <= 36; i++) {
        const angle = (i / 36) * 2 * Math.PI;
        const px = Math.round(cx + r * Math.cos(angle));
        const py = Math.round(cy + r * Math.sin(angle));
        await page.mouse.move(px, py, { steps: 3 });
        await wait(60);
      }
    } catch (_) {}
  }

  // Return to orb centre and dwell
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(1000);
  } catch (_) {}

  // Move off slightly so hover-off fade is visible before loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
