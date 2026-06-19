/**
 * Choreography: bg-particle-whirlpool
 * Behavior: Three.js instanced-mesh particle swarm with UnrealBloom post-
 *           processing. Particles are attracted toward a raycasted target
 *           point driven by mousemove. On load particles start scattered;
 *           over ~2–2.5 s they converge toward origin (default target).
 *           Strategy: settle ~2.5 s for convergence, then execute a gentle
 *           clockwise mouse drift to steer the whirlpool across the canvas,
 *           demonstrating the pointer-reactive swarm behaviour.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the Three.js canvas to mount.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Settle: let particles converge toward origin with OrbitControls damping.
  try { await wait(2500); } catch (_) {}

  // Centre of the canvas.
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);
  const r  = Math.round(Math.min(W, H) * 0.22);

  // Park at centre first.
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Slow clockwise drift — one partial orbit (~270°) to pull the whirlpool.
  try {
    const totalSteps = 60;
    const startAngle = -Math.PI / 2; // top
    const endAngle   = startAngle + 1.5 * Math.PI; // 270° clockwise
    for (let i = 0; i <= totalSteps; i++) {
      const t = i / totalSteps;
      const angle = startAngle + (endAngle - startAngle) * t;
      const mx = cx + r * Math.cos(angle);
      const my = cy + r * Math.sin(angle);
      try {
        await page.mouse.move(Math.round(mx), Math.round(my));
      } catch (_) {}
      await wait(55);
    }
  } catch (_) {}

  // Dwell at completion point with swarm attracted off-centre.
  try { await wait(1000); } catch (_) {}

  // Return mouse to centre to re-converge for loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(800);
  } catch (_) {}
}
