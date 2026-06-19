/**
 * Capture choreography for PrismaticBurst-TS-TW
 *
 * PrismaticBurst is a WebGL shader that renders radial prismatic rays
 * (animationType="rotate3d", rayCount=6, mixBlendMode="lighten"). The colours
 * cycle through a 4-stop gradient. Self-animating — no mouse interaction in
 * the demo props. The rotate3d animation type spins the burst in 3D.
 *
 * Strategy:
 *   1. Settle ~2.5 s for WebGL + shader — rotate3d animation is heavier.
 *   2. Dwell ~3 s to show the 3D rotation completing a visible arc.
 *   3. Cursor neutral at centre for clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL + rotate3d shader settle
  try {
    await wait(2500);
  } catch (_) {}

  // Dwell — let the prismatic burst rotate in 3D
  try {
    await wait(3000);
  } catch (_) {}

  // Neutral cursor position
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
    await wait(300);
  } catch (_) {}
}
