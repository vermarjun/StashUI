/**
 * Choreography: shader-toy
 * Behavior: WebGL ShaderToy canvas renders a cosine-palette gradient that
 *           evolves with iTime. The GL context and first frames take ~0.5–1 s
 *           to compile and display. Settle ~2.5 s then dwell another ~3 s so
 *           the color cycle is fully visible. mouseMode="click" — no drag
 *           interaction needed for the demo shader.
 */
export default async function choreography(page, { W, H }) {
  // Park cursor at center while GL compiles.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Settle: allow WebGL context creation + shader compilation + first render.
  try {
    await page.waitForTimeout(2500);
  } catch (_) {}

  // Gentle horizontal drift to reveal the color gradient across the canvas.
  try {
    await page.mouse.move(W * 0.25, H * 0.5, { steps: 25 });
    await page.waitForTimeout(700);
    await page.mouse.move(W * 0.75, H * 0.5, { steps: 30 });
    await page.waitForTimeout(700);
  } catch (_) {}

  // Drift diagonally to show the 2-D variation of the cosine palette.
  try {
    await page.mouse.move(W * 0.5, H * 0.25, { steps: 20 });
    await page.waitForTimeout(500);
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 20 });
    await page.waitForTimeout(500);
  } catch (_) {}

  // Final dwell at center for a stable end frame.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await page.waitForTimeout(2000);
  } catch (_) {}
}
