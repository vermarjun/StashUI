/**
 * Choreography: MagicRings-TS-TW
 * Behavior: animated shader rings cycle outward with fade-in/out; mouse
 *   moves the rings slightly when followMouse is on (default off).
 * Strategy: the rings animate fully on their own, so we just dwell ~3s to
 *   capture a complete ring cycle, then optionally drift the mouse.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    // 1. Let WebGL init and first ring cycle start
    await page.waitForTimeout(800);

    // 2. Move into the canvas so hover state registers (hoverScale effect)
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(500);
    await screenshot('rings-enter');

    // 3. Dwell at center for ~1.5s to catch mid-cycle
    await page.waitForTimeout(1500);
    await screenshot('rings-mid');

    // 4. Gentle drift toward upper-right and back
    await page.mouse.move(cx + 80, cy - 60, { steps: 15 });
    await page.waitForTimeout(600);
    await page.mouse.move(cx, cy, { steps: 15 });
    await page.waitForTimeout(600);
    await screenshot('rings-return');
  } catch (err) {
    console.warn('[MagicRings choreograph]', err?.message ?? err);
  }
}
