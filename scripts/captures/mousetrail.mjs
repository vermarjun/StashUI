/**
 * Capture choreography for mousetrail.
 *
 * The component (mousetrail.tsx / mousetrail.demo.tsx) renders an
 * ImageMouseTrail container: moving the mouse across it spawns picsum
 * images at the cursor position, cycling through 7 images with scale/opacity
 * transitions.  The demo shows "Move your mouse around" in the centre.
 * Strategy: move the mouse in prominent slow arcs across the full container
 * so multiple images spawn and the trail effect is clearly visible.
 */
export default async function capture(page, { W, H, wait }) {
  // Move into the container and settle so it mounts.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Arc 1: centre → top-left sweep.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 35 });
    await wait(80);
  } catch (_) {}

  // Arc 2: top-left → top-right.
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.22), { steps: 40 });
    await wait(80);
  } catch (_) {}

  // Arc 3: top-right → bottom-left (diagonal sweep).
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.78), { steps: 45 });
    await wait(80);
  } catch (_) {}

  // Arc 4: bottom-left → bottom-right.
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.75), { steps: 40 });
    await wait(80);
  } catch (_) {}

  // Arc 5: bottom-right → centre (inward closing arc).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 30 });
    await wait(80);
  } catch (_) {}

  // Arc 6: centre → upper-mid-right (second pass for more image spawns).
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.3), { steps: 28 });
    await wait(80);
  } catch (_) {}

  // Arc 7: upper-mid-right → lower-centre.
  try {
    await page.mouse.move(Math.round(W * 0.48), Math.round(H * 0.68), { steps: 32 });
    await wait(80);
  } catch (_) {}

  // Dwell — images are visible, trail fully spawned.
  try {
    await wait(800);
  } catch (_) {}
}
