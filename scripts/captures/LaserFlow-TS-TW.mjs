/**
 * Choreography: LaserFlow-TS-TW
 * Behavior: WebGL laser-beam shader with upward-flowing wisps and volumetric
 *   fog. May be blank in headless Chromium (no GPU). Author anyway per spec.
 * Strategy: 2s settle for WebGL init + fade-in, then dwell 3s at center,
 *   optionally drift mouse to tilt the fog column.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  try {
    // 1. WebGL settle + shader fade-in (uFade ramps to 1 over ~1s)
    await page.waitForTimeout(2000);
    await screenshot('laserflow-init');

    // 2. Hover canvas center to start mouse tracking
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(500);

    // 3. Dwell – wisp streaks and fog column visible
    await page.waitForTimeout(1500);
    await screenshot('laserflow-dwell');

    // 4. Drift mouse left – fog tilts via uTiltScale / uMouse
    await page.mouse.move(cx - 160, cy + 40, { steps: 20 });
    await page.waitForTimeout(700);
    await screenshot('laserflow-tilt-left');

    // 5. Drift right
    await page.mouse.move(cx + 160, cy + 40, { steps: 25 });
    await page.waitForTimeout(700);
    await screenshot('laserflow-tilt-right');

    // 6. Return to center
    await page.mouse.move(cx, cy, { steps: 15 });
    await page.waitForTimeout(400);
  } catch (err) {
    console.warn('[LaserFlow choreograph]', err?.message ?? err);
  }
}
