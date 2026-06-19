/**
 * Choreography: morphing-text (inspira-morphing-text)
 * Behavior: Text morphs between ["Design","Create","Build","Ship","Inspire"]
 *           using a SVG feTurbulence / feDisplacementMap blur crossfade.
 *           morphTime 1.5 s + coolDownTime 0.5 s → ~2 s per word.
 * Strategy: park mouse away, dwell ~3.5 s to capture at least one full morph
 *           transition mid-sequence.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse at top-left — no pointer interaction on this component
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 6 });
  } catch (_) {}

  // Brief settle
  try {
    await wait(300);
  } catch (_) {}

  // Dwell ~3.5 s — covers roughly 1.5+ morph cycles for a rich preview
  try {
    await wait(3500);
  } catch (_) {}

  // Return near center for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
    await wait(200);
  } catch (_) {}
}
