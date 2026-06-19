/**
 * Choreography: bg-bubbles
 * Behavior: Three.js WebGL scene — 250 spheres orbiting a central point with
 *           temperature-driven colour cycling (cool blue ↔ warm orange).
 *           Fully automatic; no pointer interaction.
 *           Strategy: wait ~2.5 s for Three.js to initialise and the first
 *           render to complete, then dwell ~3 s to show one colour-shift cycle.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the Three.js WebGLRenderer canvas to be appended to the DOM.
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 8000 });
  } catch (_) {}

  // Settle: geometry creation (250 meshes) + first render pass.
  try { await wait(2500); } catch (_) {}

  // Park cursor well outside the canvas area — component is non-interactive.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 8 });
  } catch (_) {}

  // Dwell long enough to see the temperature uniform animate through ~half a cycle
  // (sin(elapsed * 0.5) — at 2.5 s settle + 3 s dwell = 5.5 s elapsed, ~0.5 cycle).
  try { await wait(3000); } catch (_) {}

  try { await wait(500); } catch (_) {}
}
