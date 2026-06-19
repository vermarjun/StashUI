/**
 * Choreography: typewriter
 * Behavior: base text types in, then a series of phrases cycle with typewriter effect.
 * Strategy: center-aligned, no scroll — wait for base text then dwell through phrase cycling (~3.5s).
 */
export default async function choreograph(page, { W, H }) {
  // Wait for base text to finish typing (~1s delay + 1s duration).
  try {
    await page.waitForTimeout(2400);
  } catch (e) {}

  // Dwell through at least one full phrase cycle.
  try {
    await page.waitForTimeout(3500);
  } catch (e) {}
}
