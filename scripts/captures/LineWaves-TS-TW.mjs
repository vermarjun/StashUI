/**
 * Capture choreography for LineWaves-TS-TW
 *
 * LineWaves renders an OGL WebGL shader of concentric wave lines (inner + outer
 * rings) with colour-cycling and warp distortion. enableMouseInteraction=true
 * and mouseInfluence=2.0 mean cursor position strongly shifts the wave centre,
 * creating a visible pinch/stretch effect. The demo uses a -45° rotation preset.
 *
 * Strategy:
 *   1. Settle ~2 s for OGL renderer + shader compile.
 *   2. Move cursor to canvas centre to seed mouse uniforms.
 *   3. Slow spiral-like drift: centre → upper-left → lower-right to show the
 *      wave distortion following the cursor.
 *   4. Dwell ~2 s at lower-right — warp and colour cycle are both visible.
 *   5. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL init + shader settle
  try {
    await wait(2000);
  } catch (_) {}

  // Seed at centre
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(300);
  } catch (_) {}

  // Drift toward upper-left — waves pinch toward cursor
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.25), { steps: 45 });
    await wait(600);
  } catch (_) {}

  // Sweep to lower-right — full cross-viewport distortion arc
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.75), { steps: 70 });
    await wait(2000);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 40 });
    await wait(400);
  } catch (_) {}
}
