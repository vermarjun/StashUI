/**
 * Capture choreography for tweet-grid
 *
 * TweetGrid renders a 3-column masonry grid of MockTweet cards using CSS
 * columns. The tweets are static mock placeholders (no network fetch needed).
 * The demo has 6 tweets across 3 columns, making the grid taller than the
 * viewport, so scroll:true is set in the sidecar.
 *
 * NOTE: The implementation uses a MockTweet component (no real network call),
 * so content is always immediately visible — no blank-tweet risk.
 *
 * Strategy:
 *   1. Dwell ~3s at top so columns and initial cards are fully readable.
 *   2. Scroll down slowly through the full grid.
 *   3. Pause at the bottom to show the last row.
 *   4. Scroll back to the top smoothly for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let layout settle and viewer reads the top cards
  try {
    await wait(3000);
  } catch (_) {}

  // Scroll down through the grid (~3 wheel steps covering the content)
  try {
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, Math.round(H * 0.55));
      await wait(500);
    }
  } catch (_) {}

  // Dwell at the bottom
  try {
    await wait(800);
  } catch (_) {}

  // Smooth scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(800);
  } catch (_) {}
}
