/**
 * Capture choreography: carousel-3d (inspira-react)
 *
 * A Three.js CSS3DRenderer carousel arranged as a ring of image cards.  It
 * auto-rotates at 20 s/revolution (linear, infinite).  A transparent drag
 * surface (z-[100], 80 % of container height) intercepts mousedown/mousemove:
 * stopping auto-rotate, applying `-delta * 0.0025` to `carousel.rotation.y`,
 * then resuming auto-rotation on mouseup.
 *
 * The demo wraps the carousel in a full-screen flex container with a
 * "Drag to rotate" heading above.
 *
 * Strategy:
 *   1. Wait for the Three.js renderer DOM element (div.CSS3DRenderer) to mount.
 *   2. Dwell to show the auto-rotating ring.
 *   3. Drag right → left (fast) to spin the ring forward, dwell to show snap-back to auto-rotate.
 *   4. Drag left → right to spin backward, dwell.
 *   5. End while ring is auto-rotating.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the transparent drag surface to be visible
  try {
    await page.locator("div.absolute.top-\\[40\\%\\]").first().waitFor({
      state: "visible",
      timeout: 12000,
    });
  } catch {
    await wait(3000);
  }

  // Let Three.js initialise and auto-rotate for a moment
  await wait(2500);

  const cx = W * 0.5;
  // Drag surface is at 40% top, 80% height → centre ~= 80% of the 60vh container
  const cy = H * 0.5;

  // Drag 1: right → left to spin the ring forward
  try {
    await page.mouse.move(cx + 200, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 200, cy, { steps: 20 });
    await page.mouse.up();
  } catch (_) {}
  await wait(1200);

  // Drag 2: left → right to spin backward
  try {
    await page.mouse.move(cx - 150, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 150, cy, { steps: 16 });
    await page.mouse.up();
  } catch (_) {}
  await wait(1200);

  // Dwell while auto-rotate resumes
  await wait(1000);
}
