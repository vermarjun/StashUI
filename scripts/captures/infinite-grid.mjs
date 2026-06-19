/**
 * Capture choreography for infinite-grid (inspira-react)
 *
 * InfiniteGrid is a WebGL/Three.js canvas that renders a 4×3 scrollable grid
 * of image tiles with barrel-distortion post-processing. The grid responds to
 * mouse wheel events to scroll infinitely and to mouse clicks on tiles
 * (dispatches a custom "tileClicked" event).
 *
 * Strategy:
 *   1. Wait ~1000ms for the WebGL canvas to initialise and tiles to load
 *      (onTilesLoaded fires asynchronously).
 *   2. Slowly wheel downward to scroll the grid and show the infinite looping.
 *   3. Pause briefly — the distortion effect is most visible mid-scroll.
 *   4. Click a tile near the centre to trigger the tileClicked highlight.
 *   5. Wheel slightly upward to return near the start position.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for WebGL init and tile textures to load
  try {
    await wait(1000);
  } catch (_) {}

  // Focus the canvas area before wheeling
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
    await wait(200);
  } catch (_) {}

  // Scroll down slowly to animate the infinite grid pan + show distortion
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, 80);
      await wait(120);
    }
    await wait(500);
  } catch (_) {}

  // Scroll a bit more to show tile looping
  try {
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, 80);
      await wait(150);
    }
    await wait(500);
  } catch (_) {}

  // Click a tile in the centre of the grid
  try {
    await page.mouse.click(W / 2, H / 2);
    await wait(600);
  } catch (_) {}

  // Click a tile offset toward the top-right
  try {
    await page.mouse.click(W * 0.65, H * 0.3);
    await wait(500);
  } catch (_) {}

  // Scroll back upward to near-start for loop seam
  try {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, -80);
      await wait(100);
    }
    await wait(400);
  } catch (_) {}

  // Return mouse to centre
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
