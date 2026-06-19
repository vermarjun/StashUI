/**
 * Capture choreography for text-3d.
 *
 * Behaviour: pure CSS `text3dWiggle` keyframe (not WebGL) applies a gentle
 * rotate oscillation (±5 deg) on a 1500 ms alternate loop. The text uses
 * webkit-text-stroke + textShadow to create a 3D extruded appearance — visible
 * in any renderer. Effect starts immediately on mount.
 * Strategy: park mouse away, allow the CSS animation to settle through its
 * first full keyframe pass (~1.5 s), then dwell ~3 s to show 2 full oscillation
 * cycles (each 1500 ms alternate = 3 s round-trip).
 * Note: headless screenshot should be fine — pure CSS, no WebGL.
 */
export default async function capture(page, { W, H, wait }) {
  // Park cursor in top corner, clear of the centred text element.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
  } catch (_) {}

  // Settle: wait for the @keyframes animation to begin its first full pass.
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell ~3 s — 2 full wiggle cycles (1500 ms alternate × 2 = 3 s).
  try {
    await wait(3000);
  } catch (_) {}

  // Return to park for clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 3 });
    await wait(150);
  } catch (_) {}
}
