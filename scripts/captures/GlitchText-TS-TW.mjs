/**
 * Capture choreography for GlitchText-TS-TW
 *
 * GlitchText applies a clip-path glitch animation via CSS pseudo-elements
 * (::before and ::after) continuously (enableOnHover=false default). The
 * animation runs at all times — no interaction is needed to start it.
 *
 * Strategy:
 *   1. Short mount settle to let CSS animations fire.
 *   2. Move mouse to centre (neutral — the demo renders enableOnHover=false
 *      by default so glitch is always on).
 *   3. Dwell ~3 s to capture multiple glitch cycles.
 *   4. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle for CSS animation registration
  try {
    await wait(300);
  } catch (_) {}

  // Centre mouse — no interaction needed, glitch is always running
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}

  // Dwell to capture multiple glitch cycles
  try {
    await wait(3000);
  } catch (_) {}

  // Brief final pause at centre for loop seam
  try {
    await wait(300);
  } catch (_) {}
}
