/**
 * Capture choreography for RippleGrid-TS-TW
 *
 * RippleGrid is an OGL WebGL shader that renders a rippling perspective grid
 * with a radial sine wave centred on the viewport. mouseInteraction=true adds
 * a secondary ripple wave emanating from the cursor position with an
 * exponential falloff. The grid pulses continuously from centre.
 *
 * Strategy:
 *   1. Settle 2 s for OGL renderer + shader compilation.
 *   2. Move mouse to canvas centre — triggers mouseenter (mouseInfluence ramps
 *      to 1.0) and places the secondary ripple source at the centre.
 *   3. Dwell 3 s — base radial ripple is clearly visible; the mouse ripple
 *      overlays at the centre creating a constructive-interference highlight.
 *   4. Slow circular drift around the centre — the mouse-driven ripple source
 *      follows the cursor, warping the grid in an arc.
 *   5. Move to one quadrant and hold — shows the asymmetric ripple distortion.
 *   6. Return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // OGL renderer + shader compilation
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Enter the canvas at centre to activate mouse ripple
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Dwell — base ripple animates from centre
  try {
    await wait(3000);
  } catch (_) {}

  // Slow circular drift — mouse ripple traces an arc around the grid
  try {
    const r = Math.round(Math.min(W, H) * 0.22);
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const tx = cx + Math.round(r * Math.cos(angle));
      const ty = cy + Math.round(r * Math.sin(angle));
      await page.mouse.move(tx, ty, { steps: 8 });
      await wait(60);
    }
  } catch (_) {}

  // Hold off-centre to show asymmetric ripple distortion
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.4), { steps: 6 });
    await wait(800);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
