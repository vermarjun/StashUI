/**
 * Capture choreography for Prism-TS-TW
 *
 * Prism is a WebGL shader background with a rotating prismatic colour effect
 * (animationType="rotate", timeScale=0.5). It is purely self-animating with no
 * mouse interaction exposed in the demo. The shader rotates spectral light
 * slowly — a simple dwell is the best capture strategy.
 *
 * Strategy:
 *   1. Settle ~2 s for WebGL context + shader compilation.
 *   2. Dwell ~3 s to show the slow rotation and colour shift.
 *   3. End near centre — clean loop seam (no cursor state to reset).
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL + shader settle
  try {
    await wait(2000);
  } catch (_) {}

  // Dwell — let the prism rotate and cycle colours
  try {
    await wait(3000);
  } catch (_) {}

  // Position cursor at centre (neutral; no interaction, but good loop hygiene)
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
    await wait(300);
  } catch (_) {}
}
