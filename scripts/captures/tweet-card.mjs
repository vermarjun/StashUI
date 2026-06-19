/**
 * Capture script: tweet-card
 * Choreography: dwell ~3s to let the tweet fetch from the network; if it stays blank, log a note.
 */
export default async function capture({ page, W, H }) {
  // Wait for either the tweet body or the "not found" fallback to appear
  try {
    await Promise.race([
      page.locator('text=Tweet not found').waitFor({ state: 'visible', timeout: 4000 }),
      page.locator('.relative.flex.h-fit').waitFor({ state: 'visible', timeout: 4000 }),
    ]);
  } catch (e) {
    console.warn('tweet-card: neither tweet content nor fallback visible after 4s; card may be blank in capture');
  }

  // Dwell to let any async render settle
  try {
    await page.waitForTimeout(3000);
  } catch (e) {
    console.warn('tweet-card: dwell wait error', e.message);
  }

  // End at resting position (no scroll needed)
}
