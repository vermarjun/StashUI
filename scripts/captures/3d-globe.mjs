// 3d-globe: Three.js/r3f globe with OrbitControls auto-rotate.
// Textures are loaded from unpkg — give it extra settle time before dweling.
export default async function capture(page, { W, H, wait }) {
  // Allow WebGL context to initialize and textures to load
  try { await wait(2200); } catch (_) {}

  // Globe auto-rotates via OrbitControls autoRotate — just dwell and let it spin.
  // Capture a ~3 s window of smooth rotation.
  try { await wait(3000); } catch (_) {}

  // Optional: add a gentle drag to show the globe is interactive and
  // rotate it a bit further if auto-rotate is slow.
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx - 80, cy);
    await page.mouse.down();
    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cx - 80 + Math.round(160 * (i / steps)), cy);
      await wait(60);
    }
    await page.mouse.up();
  } catch (_) {}

  try { await wait(1000); } catch (_) {}
}
