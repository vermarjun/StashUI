/**
 * Capture choreography for: mesh-gradient-background
 * Behaviour: @react-three/fiber Canvas with a Perlin-noise vertex-displaced
 * sphere blob (color '#2cb978'), OrbitControls, Environment preset='city',
 * and @react-three/postprocessing Noise effect. WebGL — needs ~2.5 s for
 * Three.js context + environment map to load, then dwell ~3 s to show the
 * displaced blob in motion.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the R3F canvas to appear
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Three.js + environment map + postprocessing shader settle (~2.5 s)
  try {
    await wait(2500);
  } catch (_) {}

  // Move mouse to blob centre to show OrbitControls response subtly
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
  } catch (_) {}

  // Dwell: blob Perlin noise continuously shifts — let a full ripple show
  try {
    await wait(1500);
  } catch (_) {}

  // Gentle drift across the blob to hint at 3-D depth
  try {
    await page.mouse.move(W * 0.55, H * 0.45, { steps: 20 });
    await wait(800);
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 20 });
  } catch (_) {}

  // Final dwell for clean loop seam
  try {
    await wait(1000);
  } catch (_) {}
}
