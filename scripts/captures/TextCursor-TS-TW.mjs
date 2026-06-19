/**
 * Choreography: TextCursor-TS-TW
 * Behavior: as the mouse moves, the component spawns text characters (✦) at
 *   spacing intervals that float and fade. Trail accumulates while moving.
 * Strategy: sweep mouse in a smooth arc across the container so a visible
 *   trail of characters spawns, then dwell to let them float/fade naturally.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    // 1. Settle
    await page.waitForTimeout(400);

    // 2. Enter component area from left edge
    await page.mouse.move(Math.round(W * 0.1), cy);
    await page.waitForTimeout(200);

    // 3. Sweep right in a gentle S-curve to spawn trail characters
    const totalSteps = 50;
    const startX = Math.round(W * 0.1);
    const endX = Math.round(W * 0.9);
    for (let i = 0; i <= totalSteps; i++) {
      const t = i / totalSteps;
      const x = Math.round(startX + (endX - startX) * t);
      // S-curve: sin wave gives gentle up-down drift
      const y = Math.round(cy + Math.sin(t * Math.PI * 2) * 60);
      await page.mouse.move(x, y);
      await page.waitForTimeout(30);
    }

    await screenshot('trail-mid-sweep');

    // 4. Dwell – characters float and begin to fade
    await page.waitForTimeout(800);
    await screenshot('trail-float');

    // 5. Second sweep back left (shorter arc)
    for (let i = 0; i <= 25; i++) {
      const t = i / 25;
      const x = Math.round(endX - (endX - cx) * t);
      const y = Math.round(cy - 30 + Math.sin(t * Math.PI) * 30);
      await page.mouse.move(x, y);
      await page.waitForTimeout(35);
    }

    // 6. Return near start position
    await page.mouse.move(cx, cy, { steps: 10 });
    await page.waitForTimeout(400);
  } catch (err) {
    console.warn('[TextCursor choreograph]', err?.message ?? err);
  }
}
