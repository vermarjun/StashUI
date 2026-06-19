/**
 * Choreography: cult-ui-text-animate
 * Behavior: three stacked text lines animate in (whipInUp / fadeInUp / calmInUp); dwell then done.
 * Strategy: center-aligned, no scroll — just wait for all three animations to complete then dwell.
 */
export default async function choreograph(page, { W, H }) {
  // All three TextAnimate items animate in on mount — wait for the last one to settle.
  try {
    await page.waitForTimeout(2800);
  } catch (e) {
    // ignore timeout errors; proceed to dwell
  }

  // Dwell so all three lines are fully visible.
  try {
    await page.waitForTimeout(1800);
  } catch (e) {}
}
