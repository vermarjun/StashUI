/**
 * Capture choreography for LiquidEther-TS-TW
 *
 * LiquidEther is a full fluid-simulation (Navier-Stokes on WebGL FBOs via
 * Three.js). The demo enables autoDemo=true so an internal AutoDriver
 * animates the cursor in the viewport after a short idle delay, producing
 * swirling colour streaks even without real pointer events.
 *
 * Moving the mouse inside the container overrides the auto-driver and applies
 * mouse_force directly to the velocity FBOs. Leaving the container lets the
 * auto-driver resume after autoResumeDelay (default 1 s).
 *
 * Strategy:
 *   1. Long settle 2.5 s for Three.js + FBO allocation + auto-driver warm-up.
 *   2. Move pointer to canvas centre to hand off from auto-driver to real mouse
 *      control (triggers takeoverActive transition).
 *   3. Dwell 2 s — the fluid that auto-driver seeded continues to swirl.
 *   4. Gentle figure-8 drift across the canvas — the fluid trails follow the
 *      cursor, creating long colour streaks in the default palette
 *      (purple / pink / lavender).
 *   5. Hold top-left, then sweep to bottom-right — shows the full advection
 *      of the colour field.
 *   6. Move to centre and dwell — let the fluid diffuse and soften.
 */
export default async function capture(page, { W, H, wait }) {
  // Three.js + FBO allocation + auto-driver warm-up
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Hand control from auto-driver to real mouse
  try {
    await page.mouse.move(cx, cy, { steps: 4 });
  } catch (_) {}

  // Let auto-seeded fluid swirl
  try {
    await wait(2000);
  } catch (_) {}

  // Figure-8 drift — creates interleaved colour streaks
  try {
    const rx = Math.round(W * 0.28);
    const ry = Math.round(H * 0.22);
    // First lobe
    for (let i = 0; i <= 12; i++) {
      const t = (i / 12) * Math.PI;
      const tx = cx + Math.round(rx * Math.sin(t));
      const ty = cy - Math.round(ry * Math.sin(2 * t) * 0.5);
      await page.mouse.move(tx, ty, { steps: 5 });
      await wait(30);
    }
    // Second lobe
    for (let i = 0; i <= 12; i++) {
      const t = Math.PI + (i / 12) * Math.PI;
      const tx = cx + Math.round(rx * Math.sin(t));
      const ty = cy - Math.round(ry * Math.sin(2 * t) * 0.5);
      await page.mouse.move(tx, ty, { steps: 5 });
      await wait(30);
    }
  } catch (_) {}

  // Hold top-left then sweep to bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 8 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.75), { steps: 24 });
    await wait(400);
  } catch (_) {}

  // Return to centre and dwell — fluid diffuses
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(800);
  } catch (_) {}
}
