/**
 * Choreography: fluid-cursor
 * Behavior: WebGL fluid simulation canvas fills the 400 px tall demo area.
 *           The simulation reacts to mouse movement by injecting splats of colour.
 *           May be blank in headless — author anyway; orchestrator falls back.
 *           Strategy: settle ~1.5 s, then large slow arcs across the canvas.
 */
export default async function choreography(page, { W, H }) {
  // The demo div is w-full h-[400px]; assume it starts near the top of the
  // preview iframe.  Centre of the canvas ≈ (W/2, 200).
  const cx = W / 2;
  const cy = H / 2;

  // Settle — give the WebGL context time to initialise.
  try {
    await page.mouse.move(cx, cy, { steps: 5 });
    await page.waitForTimeout(1500);
  } catch (_) {}

  // Big slow arcs — trace three overlapping elliptical paths so the fluid trails
  // cross and blend, producing vivid colour mixing.

  // Arc 1: wide horizontal sweep
  try {
    await page.mouse.move(cx - W * 0.38, cy - H * 0.15, { steps: 40 });
    await page.waitForTimeout(80);
    await page.mouse.move(cx + W * 0.38, cy + H * 0.15, { steps: 60 });
    await page.waitForTimeout(80);
    await page.mouse.move(cx,            cy,             { steps: 40 });
    await page.waitForTimeout(500);
  } catch (_) {}

  // Arc 2: diagonal sweep top-right → bottom-left
  try {
    await page.mouse.move(cx + W * 0.35, cy - H * 0.25, { steps: 45 });
    await page.waitForTimeout(80);
    await page.mouse.move(cx - W * 0.35, cy + H * 0.25, { steps: 65 });
    await page.waitForTimeout(80);
    await page.mouse.move(cx,            cy,             { steps: 40 });
    await page.waitForTimeout(500);
  } catch (_) {}

  // Arc 3: tight figure-eight in the centre to create swirl
  try {
    await page.mouse.move(cx - W * 0.20, cy - H * 0.12, { steps: 30 });
    await page.waitForTimeout(60);
    await page.mouse.move(cx + W * 0.20, cy + H * 0.12, { steps: 30 });
    await page.waitForTimeout(60);
    await page.mouse.move(cx - W * 0.20, cy + H * 0.12, { steps: 30 });
    await page.waitForTimeout(60);
    await page.mouse.move(cx + W * 0.20, cy - H * 0.12, { steps: 30 });
    await page.waitForTimeout(60);
    await page.mouse.move(cx,            cy,             { steps: 25 });
    await page.waitForTimeout(800);
  } catch (_) {}

  // Final dwell — let fluid dissipate slightly to show the trailing effect.
  try {
    await page.waitForTimeout(1000);
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
}
