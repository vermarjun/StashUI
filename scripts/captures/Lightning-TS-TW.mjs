/**
 * Capture choreography for Lightning-TS-TW
 *
 * Lightning is a WebGL (raw gl) fragment shader rendering a vertical lightning
 * column with fbm noise distortion. The bolt animates via iTime * uSpeed — no
 * pointer interaction. The canvas uses alpha blending so the black background
 * shows through between bolt branches. hue=230 gives blue-violet.
 *
 * Strategy:
 *   1. Settle ~2 s for WebGL context + shader compile + first render.
 *   2. Cursor at canvas centre (neutral — no uMouse in this shader).
 *   3. Dwell ~3.5 s — the bolt branches flicker and morph via fbm noise, giving
 *      a natural lightning flash cadence.
 *   4. Stay at centre for clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // WebGL + shader compile settle
  try {
    await wait(2000);
  } catch (_) {}

  // Neutral cursor — no pointer interaction in shader
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
  } catch (_) {}

  // Dwell — lightning bolt branches and flickers via fbm
  try {
    await wait(3500);
  } catch (_) {}
}
