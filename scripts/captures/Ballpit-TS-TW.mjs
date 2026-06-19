/**
 * Capture choreography for Ballpit-TS-TW
 *
 * Ballpit is a Three.js InstancedMesh physics simulation (GSAP Observer +
 * custom physics). Balls fall under gravity; moving the mouse pushes them
 * away via a raycaster-based force. WebGL — may be blank headless.
 *
 * Strategy:
 *   1. Settle 2 s for Three.js renderer + physics to boot and balls to fall
 *      into resting positions.
 *   2. Dwell 1.5 s watching the passive jitter.
 *   3. Drag mouse slowly left→right across the pit centre — creates a visible
 *      ripple / push-wave through the ball cluster.
 *   4. Pause 800 ms for balls to settle back.
 *   5. Circular drift around the centre — shows multi-directional push forces.
 *   6. Settle, return mouse to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Three.js init + physics settle
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Dwell — passive ball jitter visible
  try {
    await wait(1500);
  } catch (_) {}

  // Slow left→right drag across the pit
  try {
    await page.mouse.move(Math.round(W * 0.15), cy, { steps: 4 });
    await page.mouse.move(Math.round(W * 0.85), cy, { steps: 28 });
  } catch (_) {}

  try {
    await wait(800);
  } catch (_) {}

  // Circular drift — 8-step approximation using straight segments
  try {
    const r = Math.round(Math.min(W, H) * 0.18);
    const steps = 8;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const tx = cx + Math.round(r * Math.cos(angle));
      const ty = cy + Math.round(r * Math.sin(angle));
      await page.mouse.move(tx, ty, { steps: 6 });
      await wait(80);
    }
  } catch (_) {}

  // Settle
  try {
    await wait(1000);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
