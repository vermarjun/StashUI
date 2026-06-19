/**
 * Choreography: bg-silk
 * Behavior: GLSL silk-fabric shader via ShaderToy wrapper — smooth undulating
 *           surface with fabric-noise micro-detail. iMouse is sampled when
 *           iMouse.z > 1 (mouse button held). Strategy: settle ~2 s for the
 *           shader to compile and reach a visually interesting phase, dwell
 *           ~3 s, then hold a slow mouse drag to trigger the iMouse fabric
 *           distortion effect across the canvas.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the ShaderToy canvas to mount and first frame to render.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Shader compile + settle.
  try { await wait(2000); } catch (_) {}

  // Dwell: let the iTime-driven animation produce a visible fabric ripple.
  try { await wait(3000); } catch (_) {}

  // Trigger iMouse drag (iMouse.z > 1 when mouse is pressed) for distortion.
  try {
    const sx = Math.round(W * 0.3);
    const sy = Math.round(H * 0.5);
    const ex = Math.round(W * 0.7);
    const ey = Math.round(H * 0.5);
    await page.mouse.move(sx, sy, { steps: 8 });
    await page.mouse.down();
    await wait(200);
    await page.mouse.move(ex, ey, { steps: 30 });
    await wait(600);
    await page.mouse.up();
  } catch (_) {}

  // Return to centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
    await wait(500);
  } catch (_) {}
}
