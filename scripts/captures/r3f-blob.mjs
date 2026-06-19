// Choreography for r3f-blob
// WebGL React-Three-Fiber blob: an icosahedron with Perlin-noise displacement shader.
// The blob reacts to mouse position (lerped) and pointer-over raises intensity.
// Strategy: let the shader settle (~2s), then drift the mouse slowly across the blob
// center to show the intensity ramp-up, dwell ~3s, gentle circular drift for loop seam.
// NOTE: WebGL may be blank in headless — orchestrator falls back gracefully.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the canvas element to mount
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  // Allow the shader to initialise and blob to settle (~2s at 0.4× clock)
  await wait(2000);

  // Move mouse to blob center and trigger pointer-over (raises u_intensity → 0.7)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 16 });
  } catch (_) {}
  await wait(600);

  // Slow drift: top-left → bottom-right across the blob body to show displacement
  try {
    const steps = 50;
    const x0 = W * 0.35;
    const y0 = H * 0.35;
    const x1 = W * 0.65;
    const y1 = H * 0.65;
    await page.mouse.move(x0, y0, { steps: 10 });
    for (let i = 1; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(
          x0 + (x1 - x0) * t,
          y0 + (y1 - y0) * t
        );
      } catch (_) {}
      await wait(35);
    }
  } catch (_) {}

  // Dwell at lower-right while blob displacement is fully ramped
  await wait(1200);

  // Gentle arc back toward center — a partial clockwise quarter-circle
  try {
    const steps = 30;
    const cx = W * 0.5;
    const cy = H * 0.5;
    const r = W * 0.12;
    for (let i = 0; i <= steps; i++) {
      try {
        const angle = (Math.PI * 0.25) + (Math.PI * 0.5) * (i / steps); // 45° → 135°
        await page.mouse.move(
          cx + r * Math.cos(angle),
          cy + r * Math.sin(angle),
          { steps: 1 }
        );
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  // Final dwell at center for clean loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
  } catch (_) {}
  await wait(800);
}
