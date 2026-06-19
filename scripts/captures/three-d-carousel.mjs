/**
 * Capture choreography: three-d-carousel (cult-ui)
 *
 * A 3-D photo cylinder rendered with Framer Motion CSS transforms.
 * The track is a wide div (1100–1800 px) that responds to pointer drag on the
 * X axis — dragging right rotates counter-clockwise, left clockwise.  Clicking
 * a card opens a full-screen overlay; clicking the overlay closes it.
 *
 * Strategy:
 *   1. Wait for images to blur-in (initial filter: blur(4px) → blur(0px)).
 *   2. Drag the cylinder right (+300 px) to rotate it, dwell.
 *   3. Drag left (−350 px) to over-rotate back and show a new face, dwell.
 *   4. Drag left again (−300 px), dwell — end near starting position.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for at least one carousel image to be visible
  try {
    await page.locator("img").first().waitFor({ state: "visible", timeout: 10000 });
  } catch {
    await wait(2000);
  }

  // Let blur-in transitions settle
  await wait(1200);

  // Centre of the carousel stage
  const cx = W * 0.5;
  const cy = H * 0.5;

  // Drag 1: rotate forward (drag right → CCW)
  try {
    await page.mouse.move(cx - 120, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 180, cy, { steps: 18 });
    await page.mouse.up();
  } catch (_) {}
  await wait(900);

  // Drag 2: rotate back and past centre (drag left)
  try {
    await page.mouse.move(cx + 100, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 250, cy, { steps: 22 });
    await page.mouse.up();
  } catch (_) {}
  await wait(900);

  // Drag 3: gentle drag right to settle near start
  try {
    await page.mouse.move(cx - 60, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 120, cy, { steps: 14 });
    await page.mouse.up();
  } catch (_) {}

  await wait(800);
}
