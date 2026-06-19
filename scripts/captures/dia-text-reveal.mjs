/**
 * Choreography: dia-text-reveal
 * Behavior: colored gradient band sweeps left-to-right over text on mount (startOnView=true).
 * With repeat=true the demo cycles through 3 phrases (~1.5 s sweep + 0.8 s pause each).
 * Strategy: dwell ~4 s to capture the initial sweep and first repeat transition.
 */
export default async function choreograph({ page, W, H }) {
  // Park mouse in neutral position; no hover interaction needed
  try {
    await page.mouse.move(W * 0.1, H * 0.1);
  } catch (e) {
    // non-fatal
  }

  // Wait for in-view trigger to fire, then dwell through the sweep + one repeat
  try {
    await page.waitForTimeout(4000);
  } catch (e) {
    // non-fatal
  }
}
