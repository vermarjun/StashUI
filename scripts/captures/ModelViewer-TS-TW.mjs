/**
 * Capture choreography for ModelViewer-TS-TW
 *
 * ModelViewer uses @react-three/fiber + drei with a GLB loaded from a CDN.
 * The Duck.glb is small (~170 KB) but the drei Environment preset and WebGL
 * context need time to initialise. autoRotate spins the model automatically.
 * Strategy:
 *   1. Long settle ~3 s for WebGL context + GLB download + fade-in.
 *   2. Let autoRotate spin for ~2 s — shows the model rotating smoothly.
 *   3. Drag horizontally (pointer down/move/up) to orbit — overrides inertia.
 *   4. Release and let inertia carry it a bit (~1 s).
 *   5. End near centre for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow WebGL + CDN GLB to load
  try { await wait(3000); } catch (_) {}

  // Watch autoRotate for 2 s
  try { await wait(2000); } catch (_) {}

  // Drag to orbit: left→right across the canvas centre
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx - 100, cy, { steps: 6 });
    await page.mouse.down();
    const steps = 18;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cx - 100 + Math.round(200 * (i / steps)), cy);
      await wait(45);
    }
    await page.mouse.up();
  } catch (_) {}

  // Let inertia + autoRotate run
  try { await wait(1200); } catch (_) {}

  // Return mouse to centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
    await wait(400);
  } catch (_) {}
}
