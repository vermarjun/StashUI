/**
 * Capture choreography: images-slider
 *
 * A full-bleed image slider that auto-advances every 5 s with a dramatic
 * scale+rotateX entrance animation. There are no nav buttons in the demo —
 * the component relies on autoplay and ArrowRight/ArrowLeft keyboard events.
 * Strategy:
 *   1. Wait for images to load (component sets `loadedImages` state).
 *   2. Dwell so the first image is visible in its animated-in state.
 *   3. Press ArrowRight twice (with ~1.8 s dwell between) to advance manually.
 *   4. Dwell on the third slide so the clip ends on a clean image.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for at least one image to be rendered
  try {
    await page.locator("img.image").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch {
    await wait(2000);
  }

  // Let the first slide fully animate in
  await wait(1500);

  // Advance to slide 2 via ArrowRight keypress
  try {
    await page.keyboard.press("ArrowRight");
  } catch {
    // ignore
  }

  // Dwell to show slide 2 entrance animation complete
  await wait(1800);

  // Advance to slide 3
  try {
    await page.keyboard.press("ArrowRight");
  } catch {
    // ignore
  }

  // Dwell on slide 3
  await wait(1800);

  // Advance once more to show the loop / slide 4
  try {
    await page.keyboard.press("ArrowRight");
  } catch {
    // ignore
  }

  await wait(1500);
}
