/**
 * Choreography: InfiniteMenu-TS-TW
 *
 * WebGL sphere menu — settle ~2s then drag to rotate slowly.
 * Drag is simulated with pointerdown + pointermove + pointerup.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // 1. Wait for images to load and sphere to settle
  try { await wait(2200); } catch (_) {}

  // 2. Slow drag: left → right (rotate sphere)
  try {
    await page.mouse.move(cx - 100, cy, { steps: 4 });
    await page.mouse.down();
    await page.mouse.move(cx + 80, cy - 20, { steps: 20 });
    await wait(300);
    await page.mouse.up();
    await wait(800); // snap back / settle
  } catch (_) {}

  // 3. Another drag: top-left → bottom-right (tilt)
  try {
    await page.mouse.move(cx - 60, cy - 60, { steps: 4 });
    await page.mouse.down();
    await page.mouse.move(cx + 60, cy + 50, { steps: 18 });
    await wait(200);
    await page.mouse.up();
    await wait(1000); // let sphere snap to nearest item
  } catch (_) {}

  // 4. Gentle final drag back toward start
  try {
    await page.mouse.move(cx + 60, cy, { steps: 4 });
    await page.mouse.down();
    await page.mouse.move(cx - 40, cy, { steps: 14 });
    await wait(150);
    await page.mouse.up();
    await wait(800);
  } catch (_) {}
}
