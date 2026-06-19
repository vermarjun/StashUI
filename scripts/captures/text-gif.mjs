/**
 * Choreography: text-gif
 * Behavior: text masks an animated GIF via background-clip; plays continuously after load.
 * Strategy: center-aligned, no scroll — wait for GIF to load then dwell ~3s.
 */
export default async function choreograph(page, { W, H }) {
  // Wait for the hidden preload <img> to trigger onLoad and set `loaded` state.
  try {
    await page.waitForFunction(
      () => {
        const imgs = document.querySelectorAll('img');
        return Array.from(imgs).some((img) => img.complete && img.naturalWidth > 0);
      },
      { timeout: 8000 }
    );
  } catch (e) {
    // GIF may be slow; proceed anyway after a fixed wait.
    await page.waitForTimeout(4000).catch(() => {});
  }

  // Allow transition (300ms) to complete.
  try {
    await page.waitForTimeout(500);
  } catch (e) {}

  // Dwell so the animated GIF is clearly visible through the text mask.
  try {
    await page.waitForTimeout(3000);
  } catch (e) {}
}
