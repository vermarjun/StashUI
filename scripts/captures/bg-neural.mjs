/**
 * Choreography: bg-neural
 * Behavior: OGL (WebGL) fullscreen shader — "neuro_shape" fractal with a
 *           pointer-reactive brightness bloom (u_pointer_position uniform).
 *           A bright glow brightens near the cursor. Strategy: settle ~2 s,
 *           then drift the mouse in a slow S-curve across the canvas to show
 *           the pointer-reactive bloom, dwell, return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for OGL Renderer to init and the first RAF frame to render.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  // Settle: shader compile + first render.
  try { await wait(2000); } catch (_) {}

  // Start with cursor off-centre — background is dark without pointer near it.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
    await wait(500);
  } catch (_) {}

  // Slow S-curve drift: top-left → centre → bottom-right, triggering bloom.
  try {
    const steps = 40;
    const points = [
      [W * 0.25, H * 0.25],
      [W * 0.50, H * 0.50],
      [W * 0.75, H * 0.75],
    ];
    for (const [tx, ty] of points) {
      await page.mouse.move(Math.round(tx), Math.round(ty), { steps });
      await wait(800);
    }
  } catch (_) {}

  // Reverse drift back to centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Dwell at centre with full bloom.
  try { await wait(1500); } catch (_) {}
}
