/**
 * Choreography: randomized-text-effect  (source: text-randomized.tsx)
 * Behavior: letters scramble randomly then resolve left-to-right into the final text.
 *           Animation fires on mount (useEffect) and takes ~300ms random + 80ms×N reveal.
 * Strategy: center-aligned, no scroll — wait for scramble phase, then dwell while letters
 *           resolve into final text (~3s total).
 */
export default async function choreograph(page, { W, H }) {
  // Allow scramble phase (300ms) to begin visibly.
  try {
    await page.waitForTimeout(400);
  } catch (e) {}

  // Dwell through reveal phase (~80ms × ~20 chars = ~1600ms + buffer).
  try {
    await page.waitForTimeout(3000);
  } catch (e) {}
}
