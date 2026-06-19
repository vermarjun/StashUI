/**
 * Capture choreography: loading-carousel (cult-ui)
 *
 * An Embla carousel that auto-advances on a 4.5 s interval.  Below the image
 * panel sits a row of thin progress-bar indicators — the active one animates
 * scaleX 0→1 over the autoplay interval.  There are no visible prev/next
 * arrow buttons in the default demo (showNavigation=false).
 *
 * Strategy:
 *   1. Wait for the carousel wrapper to appear.
 *   2. Dwell ~4 s to capture a full progress-bar fill + auto-advance.
 *   3. Dwell another ~4 s to show a second auto-advance (slide 2 → 3).
 *   4. Brief final dwell — ends while slide 3 progress bar is partway through.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the carousel container
  try {
    await page.locator(".overflow-hidden.rounded-xl").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch {
    await wait(2000);
  }

  // Let images load and entrance animation finish (motion: opacity 0→1, y 20→0, 0.8s)
  await wait(1200);

  // Park mouse away from any interactive area
  try {
    await page.mouse.move(W * 0.5, H * 0.1);
  } catch (_) {}

  // Dwell to let slide 1 progress bar fill and auto-advance fire (~4.5 s)
  await wait(4000);

  // Short pause after transition animation (~0.8 s)
  await wait(900);

  // Dwell through slide 2's full progress cycle
  await wait(4000);

  // Show the beginning of slide 3's progress bar
  await wait(800);
}
