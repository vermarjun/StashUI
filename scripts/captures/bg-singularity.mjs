/**
 * Choreography: bg-singularity
 * Behavior: GLSL "Singularity" shader by @XorDev via ShaderToy wrapper —
 *           a swirling logarithmic spiral with complex number warping driven
 *           by iTime. The ShaderToy wrapper may also propagate iMouse.
 *           Strategy: settle ~2.5 s for shader compile and spiral to develop
 *           its distinctive ring structure, then dwell ~3 s on the evolving
 *           geometry.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for canvas to mount.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Shader compile + settle — the Singularity shader takes a moment to reach
  // its characteristic warped-ring appearance.
  try { await wait(2500); } catch (_) {}

  // Park cursor at centre (singularity focal point at ~0.7 radius in NDC).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
  } catch (_) {}

  // Dwell: the shader evolves continuously — capture the spiral rotation.
  try { await wait(3000); } catch (_) {}

  // Gentle drift upward to show the upper arc of the ring.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.3), { steps: 20 });
    await wait(800);
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
