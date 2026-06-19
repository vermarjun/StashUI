/**
 * Capture choreography for GradientBlinds-TS-TW
 *
 * GradientBlinds is a WebGL OGL shader that renders gradient colour bands
 * ("blinds") rotated at an angle, with a spotlight glow that follows the
 * mouse (spotlightOpacity=0.8, spotlightRadius=0.5, mouseDampening=0.15).
 * The demo: gradientColors=["#FF9FFC","#5227FF","#00D4FF"], blindCount=20,
 * angle=15°, noise=0.2.
 *
 * Strategy:
 *   1. Settle ~2 s for WebGL + initial spotlight centred at canvas middle
 *      (set by firstResize logic when no mouse has moved yet).
 *   2. Dwell ~1 s on the static gradient bands with centred spotlight.
 *   3. Slow diagonal sweep — top-left → centre → bottom-right — the
 *      dampened spotlight trails visibly behind the cursor through the bands.
 *   4. Slow return to centre, dwell ~1.5 s for spotlight to settle.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 6000 });
  } catch (e) {
    console.warn('GradientBlinds: canvas not found', e.message);
  }

  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Initial idle dwell at centre spotlight position
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(1000);
  } catch (_) {}

  // Diagonal sweep top-left → bottom-right through the gradient bands
  try {
    await page.mouse.move(Math.round(W * 0.12), Math.round(H * 0.15), { steps: 8 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.88), Math.round(H * 0.85), { steps: 35 });
  } catch (e) {
    console.warn('GradientBlinds: sweep error', e.message);
  }

  try {
    await wait(300);
  } catch (_) {}

  // Return to centre, dwell for dampened spotlight to converge
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(1500);
  } catch (_) {}
}
