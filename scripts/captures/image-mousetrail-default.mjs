/**
 * Capture choreography for image-mousetrail-default.
 *
 * Shares registry/ui-layouts/mousetrail.tsx + mousetrail.demo.tsx with the
 * mousetrail component.  Moving the mouse across the container spawns images
 * at the cursor position with the default imgClass (w-40 h-48) and no fade.
 * Strategy: slow arcs across the full container so multiple images spawn.
 */
export default async function capture(page, { W, H, wait }) {
  // Enter the container and let it mount.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Arc 1: centre → top-left.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 35 });
    await wait(80);
  } catch (_) {}

  // Arc 2: top-left → top-right.
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.22), { steps: 40 });
    await wait(80);
  } catch (_) {}

  // Arc 3: top-right → bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.78), { steps: 45 });
    await wait(80);
  } catch (_) {}

  // Arc 4: bottom-left → bottom-right.
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.75), { steps: 40 });
    await wait(80);
  } catch (_) {}

  // Arc 5: bottom-right → centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 30 });
    await wait(80);
  } catch (_) {}

  // Arc 6: centre → upper-right.
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.3), { steps: 28 });
    await wait(80);
  } catch (_) {}

  // Arc 7: upper-right → lower-centre.
  try {
    await page.mouse.move(Math.round(W * 0.48), Math.round(H * 0.68), { steps: 32 });
    await wait(80);
  } catch (_) {}

  // Dwell — trail fully spawned.
  try {
    await wait(800);
  } catch (_) {}
}
