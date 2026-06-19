/**
 * Capture choreography for image-mousetrail-disappear.
 *
 * Shares registry/ui-layouts/mousetrail.tsx + mousetrail.demo.tsx.
 * This variant has fadeAnimation enabled — spawned images fade out after
 * 1500 ms.  Move in arcs so the spawn-then-disappear cycle is visible within
 * the capture window.
 */
export default async function capture(page, { W, H, wait }) {
  // Enter the container.
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

  // Pause so first-spawned images begin fading (fadeAnimation = true, 1500 ms).
  try {
    await wait(600);
  } catch (_) {}

  // Arc 3: top-right → bottom-left — spawns fresh images while earlier ones fade.
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.78), { steps: 45 });
    await wait(80);
  } catch (_) {}

  // Arc 4: bottom-left → bottom-right.
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.75), { steps: 40 });
    await wait(80);
  } catch (_) {}

  // Dwell — trail spawned, earlier images fading out simultaneously.
  try {
    await wait(1000);
  } catch (_) {}

  // Final arc through centre to re-seed the trail.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.45), { steps: 30 });
    await wait(80);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.3), { steps: 25 });
    await wait(600);
  } catch (_) {}
}
