/**
 * Choreography: animated-shiny-text
 * Behavior: continuous shine sweep across text — auto-plays on mount, dwell 3 s.
 * Strategy: park mouse away from text, dwell to capture at least one full shine cycle.
 */
export default async function choreograph({ page, W, H }) {
  // Park mouse in a neutral corner so no unintended hover state is triggered
  try {
    await page.mouse.move(W * 0.1, H * 0.1);
  } catch (e) {
    // non-fatal
  }

  // Dwell ~3 s to capture the shine sweep cycling through
  try {
    await page.waitForTimeout(3000);
  } catch (e) {
    // non-fatal
  }
}
