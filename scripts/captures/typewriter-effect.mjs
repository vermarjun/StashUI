/**
 * Capture choreography for typewriter-effect.
 *
 * Behaviour: Words are typed out character-by-character then a blinking
 * cursor holds. The effect starts on mount. Demo has 5 words totalling
 * ~23 chars; at ~60ms per char the full sequence takes ~1.4s, followed by
 * a ~0.5s pause before the cursor blinks. Dwell 3.5s to show full type-out
 * plus the blinking cursor phase.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the typewriter wrapper
  try {
    await page.waitForSelector('[class*="typewriter"], .flex.flex-col', { timeout: 6000 });
  } catch { /* ignore */ }

  // Brief settle
  try {
    await wait(300);
  } catch { /* ignore */ }

  // Mouse at centre — no interaction, just neutral position
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Dwell through the full type-out + cursor blink (~3.5s)
  try {
    await wait(3500);
  } catch { /* ignore */ }

  // End near start position
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(200);
  } catch { /* ignore */ }
}
