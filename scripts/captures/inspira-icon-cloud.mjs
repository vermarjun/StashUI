/**
 * Capture choreography for inspira-icon-cloud
 *
 * inspira-icon-cloud renders a draggable 3D icon sphere on a <canvas>. Icons
 * are drawn as clipped circle images; the sphere auto-rotates based on mouse
 * position relative to the canvas centre. Strategy:
 *   1. Settle ~1500ms for cross-origin icon images (simpleicons.org) to load
 *      and the canvas animation loop to start.
 *   2. Move the mouse slowly across the canvas to bias the auto-rotation,
 *      showing the 3D sphere spinning.
 *   3. Perform a slow drag (mousedown + move + mouseup) to manually spin the
 *      sphere further and demonstrate the draggable interaction.
 *   4. Let go and dwell while the auto-rotation resumes.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Wait for canvas images to load and the animation loop to settle
  try { await wait(1500); } catch (_) {}

  // Slowly move mouse across the canvas centre to drive auto-rotation
  try {
    await page.mouse.move(cx - 100, cy, { steps: 5 });
    await wait(400);
    await page.mouse.move(cx + 100, cy - 40, { steps: 30 });
    await wait(600);
    await page.mouse.move(cx, cy + 20, { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Drag to spin the sphere: slow horizontal drag ~160px over ~1s
  try {
    await page.mouse.move(cx - 70, cy, { steps: 8 });
    await page.mouse.down();
    for (let i = 1; i <= 20; i++) {
      await page.mouse.move(cx - 70 + Math.round(140 * (i / 20)), cy);
      await wait(50);
    }
    await page.mouse.up();
  } catch (_) {}

  // Dwell while auto-rotation resumes after drag release
  try { await wait(1000); } catch (_) {}
}
