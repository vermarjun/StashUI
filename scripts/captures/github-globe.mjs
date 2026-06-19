// github-globe: ThreeGlobe + OrbitControls with autoRotate:true in demo config.
// Arcs animate continuously once the globe is ready (waitForGlobeReady:true).
// Give a longer settle so countries GeoJSON loads and arcs start drawing.
export default async function capture(page, { W, H, wait }) {
  // Wait for ThreeGlobe to initialize, GeoJSON to load, and arcs to start.
  try { await wait(2500); } catch (_) {}

  // Dwell to capture arc animations and globe rotation.
  try { await wait(2800); } catch (_) {}

  // Drag to show the globe is interactive and reveal the arc network.
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx - 80, cy);
    await page.mouse.down();
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cx - 80 + Math.round(160 * (i / steps)), cy);
      await wait(55);
    }
    await page.mouse.up();
  } catch (_) {}

  // Let damping settle and arcs continue animating.
  try { await wait(1000); } catch (_) {}
}
