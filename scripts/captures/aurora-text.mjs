/**
 * Choreography: aurora-text
 * Behavior: aurora gradient animates continuously across text — auto-plays, dwell 3 s.
 * Strategy: park mouse in neutral position, dwell to capture gradient cycling.
 */
export default async function choreograph({ page, W, H }) {
  // Park mouse away from the component
  try {
    await page.mouse.move(W * 0.1, H * 0.9);
  } catch (e) {
    // non-fatal
  }

  // Dwell ~3 s for the aurora animation to cycle visibly
  try {
    await page.waitForTimeout(3000);
  } catch (e) {
    // non-fatal
  }
}
