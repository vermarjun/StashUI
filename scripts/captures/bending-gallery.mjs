/**
 * Capture choreography: bending-gallery (inspira-react)
 *
 * A raw WebGL gallery where planes bend in an arc based on horizontal position.
 * Scroll target advances by +2 per wheel event; mousedown + mousemove applies
 * `(startX - x) * 0.05` to scroll.target; a 200 ms debounced snap aligns to
 * the nearest item after interaction ends.
 *
 * Strategy:
 *   1. Wait for WebGL canvas to mount.
 *   2. Dwell briefly so grayscale images load from picsum.
 *   3. Drag right-to-left across the gallery to advance 2 items (~300 px drag).
 *   4. Dwell to let the snap animation settle.
 *   5. Drag left-to-right to go back one item (~200 px drag).
 *   6. Dwell to show the bent arc at rest.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the WebGL canvas to be added to the DOM
  try {
    await page.locator("canvas").first().waitFor({ state: "visible", timeout: 10000 });
  } catch {
    await wait(2000);
  }

  // Let images load (crossOrigin fetch via Image()) and initial frame render
  await wait(2000);

  const cx = W * 0.5;
  const cy = H * 0.5;

  // Drag 1: right → left to advance forward (moves ~2 items)
  try {
    await page.mouse.move(cx + 150, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 150, cy, { steps: 20 });
    await page.mouse.up();
  } catch (_) {}

  // Wait for debounced snap (200 ms) + lerp to settle (~0.5 s)
  await wait(900);

  // Dwell on the new position showing the bend arc
  await wait(800);

  // Drag 2: left → right to go back one item
  try {
    await page.mouse.move(cx - 100, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 200, cy, { steps: 16 });
    await page.mouse.up();
  } catch (_) {}

  // Settle + dwell at end position
  await wait(900);
  await wait(500);
}
