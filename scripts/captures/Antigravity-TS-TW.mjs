/**
 * Choreography: Antigravity-TS-TW
 * Behavior: WebGL Canvas – particles (capsules) float around; near the cursor
 *   they form a ring and orient toward it. Moving the mouse disturbs the ring.
 * Strategy: settle 2s for WebGL init, then sweep mouse across the canvas in
 *   a wide arc, pause at several dwell points so the ring forms visibly.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    // 1. WebGL settle
    await page.waitForTimeout(2000);

    // 2. Enter canvas center
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(800);
    await screenshot('ring-center');

    // 3. Sweep left to right across the canvas
    const sweepY = cy - 30;
    const sweepSteps = 30;
    for (let i = 0; i <= sweepSteps; i++) {
      const t = i / sweepSteps;
      await page.mouse.move(
        Math.round(cx - 250 + 500 * t),
        Math.round(sweepY + Math.sin(t * Math.PI) * -40)
      );
      await page.waitForTimeout(40);
    }

    // 4. Dwell right-of-center – ring reforms
    await page.mouse.move(cx + 160, cy + 50);
    await page.waitForTimeout(900);
    await screenshot('ring-right');

    // 5. Drift upward and dwell
    await page.mouse.move(cx + 30, cy - 100, { steps: 12 });
    await page.waitForTimeout(900);
    await screenshot('ring-upper');

    // 6. Return toward center
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (err) {
    console.warn('[Antigravity choreograph]', err?.message ?? err);
  }
}
