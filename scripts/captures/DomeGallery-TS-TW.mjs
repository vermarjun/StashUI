/**
 * Capture choreography for DomeGallery-TS-TW
 *
 * The component renders a 3D dome of images controlled by @use-gesture/react
 * drag handlers bound to the main element. Dragging horizontally rotates the
 * dome along the Y axis; dragging vertically tilts it on the X axis.
 * Releasing the mouse triggers inertia so the dome keeps spinning briefly.
 *
 * Strategy:
 *   1. Settle 1.5 s so the 3D sphere initialises and images load.
 *   2. Drag right-to-left across the centre to rotate the dome leftward
 *      (10 steps to generate meaningful velocity → inertia kick).
 *   3. Wait for inertia to spin down (~1 s).
 *   4. Drag left-to-right to rotate back toward start.
 *   5. Wait for inertia.
 *   6. Short downward drag to show the vertical tilt capability.
 *   7. End near the original centre — clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let sphere mount and images load
  try {
    await wait(1500);
  } catch (_) {}

  const cx = W / 2;
  const cy = H / 2;
  const dragDist = Math.round(W * 0.30); // ~30% of viewport width

  // Drag right → left to rotate dome leftward
  try {
    await page.mouse.move(cx + dragDist, cy, { steps: 4 });
    await page.mouse.down();
    await page.mouse.move(cx - dragDist, cy, { steps: 12 });
    await page.mouse.up();
    await wait(1000); // let inertia spin down
  } catch (_) {}

  // Drag left → right to rotate back
  try {
    await page.mouse.move(cx - dragDist * 0.6, cy, { steps: 4 });
    await page.mouse.down();
    await page.mouse.move(cx + dragDist * 0.6, cy, { steps: 12 });
    await page.mouse.up();
    await wait(1000);
  } catch (_) {}

  // Short downward drag to show vertical tilt
  try {
    const tiltDist = Math.round(H * 0.08);
    await page.mouse.move(cx, cy - tiltDist, { steps: 4 });
    await page.mouse.down();
    await page.mouse.move(cx, cy + tiltDist, { steps: 8 });
    await page.mouse.up();
    await wait(600);
  } catch (_) {}

  // Return mouse to centre — loop seam
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
