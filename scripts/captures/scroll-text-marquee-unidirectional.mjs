/**
 * Choreography: scroll-text-marquee-unidirectional  (source: animationone.tsx)
 * Behavior: two-row continuous marquee with opposite baseVelocity values (-3 / +3);
 *           scrollDependent is false so it runs at constant speed regardless of scroll.
 * Strategy: center-aligned, no scroll — dwell ~3s to show both rows moving continuously.
 */
export default async function choreograph(page, { W, H }) {
  // Wait for the 500ms delay prop before animation starts.
  try {
    await page.waitForTimeout(700);
  } catch (e) {}

  // Dwell to show both rows in continuous opposing motion.
  try {
    await page.waitForTimeout(3000);
  } catch (e) {}
}
