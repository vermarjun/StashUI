/**
 * Capture choreography for Galaxy-TS-TW
 *
 * Galaxy is a WebGL OGL star-field shader. mouseInteraction=true and
 * mouseRepulsion=true: the cursor repels stars away from its position with
 * a smooth lerp (lerpFactor=0.05). transparent=false so the black background
 * is filled, making stars pop clearly. rotationSpeed=0.08, speed=1.0.
 *
 * Strategy:
 *   1. Settle ~2.5 s for the star field to generate and first twinkle cycle.
 *   2. Slow large clockwise circle around the viewport centre — the repulsion
 *      pushes a visible "hole" through the star density as the cursor moves.
 *   3. Pause at centre for the repulsion to converge and stars to drift back.
 *   4. Dwell ~2 s on the full star field with auto-rotation visible.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 6000 });
  } catch (e) {
    console.warn('Galaxy: canvas not found', e.message);
  }

  // Star field settle + twinkle initialisation
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);
  const r = Math.round(Math.min(W, H) * 0.28);

  // Large clockwise orbit — repulsion sweeps a visible gap in the star field
  try {
    for (let i = 0; i <= 36; i++) {
      const angle = (i / 36) * 2 * Math.PI;
      const px = Math.round(cx + r * Math.cos(angle));
      const py = Math.round(cy + r * Math.sin(angle));
      await page.mouse.move(px, py, { steps: 3 });
      await wait(55);
    }
  } catch (e) {
    console.warn('Galaxy: orbit error', e.message);
  }

  // Return to centre — stars drift back inward
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(800);
  } catch (_) {}

  // Final dwell — full star field with auto-rotation
  try {
    await wait(2000);
  } catch (_) {}
}
