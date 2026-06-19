/**
 * Capture choreography for FuzzyText-TS-TW
 *
 * FuzzyText renders text to a canvas and applies per-scanline horizontal
 * jitter. At rest the jitter is mild (baseIntensity 0.18); hovering over the
 * canvas text area raises intensity to hoverIntensity (0.5 default).
 *
 * Strategy:
 *   1. Settle for canvas init + font load (~800 ms).
 *   2. Move mouse onto the canvas text area (centre of viewport) to trigger
 *      the high-intensity hover fuzz.
 *   3. Dwell ~2.5 s to capture the intensified fuzzy effect.
 *   4. Slide mouse slightly off the text to show the contrast with lower
 *      base intensity.
 *   5. Dwell briefly, then return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas init + font load settle
  try {
    await wait(800);
  } catch (_) {}

  // Move mouse onto the canvas / text area
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
    await wait(300);
  } catch (_) {}

  // Dwell on the high-intensity hover fuzz
  try {
    await wait(2500);
  } catch (_) {}

  // Slide off the text to show base intensity contrast
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 18 });
    await wait(800);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 18 });
    await wait(300);
  } catch (_) {}
}
