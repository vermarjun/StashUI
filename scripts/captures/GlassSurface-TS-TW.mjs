/**
 * Capture choreography for GlassSurface-TS-TW
 *
 * GlassSurface is a CSS/SVG glass-morphism panel. It uses SVG
 * feDisplacementMap for chromatic-aberration refraction of background content.
 * The effect is purely CSS+SVG — no pointer interactivity beyond focus states.
 * The demo renders it centred over a grid background (sidecar: "grid").
 *
 * Strategy:
 *   1. Settle 600 ms for SVG filter and ResizeObserver to compute the
 *      displacement map data-URI.
 *   2. Dwell 3 s — the glass surface is fully static; let it breathe.
 *   3. Gentle mouse drift around the panel to show it sits on top of the grid
 *      pattern (makes the refraction effect visible to viewers).
 *   4. Return to centre — clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // SVG filter map generation + ResizeObserver
  try {
    await wait(600);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Dwell so the glass panel is fully visible
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle drift around the panel — no direct interaction, just shows context
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.4), { steps: 14 });
    await wait(500);
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.45), { steps: 14 });
    await wait(500);
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.6), { steps: 14 });
    await wait(500);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
