/**
 * Capture choreography for inspira-liquid-glass (file: liquid-glass.demo.tsx).
 *
 * Effect: SVG feDisplacementMap + feColorMatrix chromatic-aberration distortion
 * rendered as a fixed glass panel over a colourful background image. The effect
 * is always-on (not pointer-driven) but the panel is centered and static.
 *
 * Strategy:
 *   1. Settle ~1.5 s — SVG filter resolves, backdrop-filter paints.
 *   2. Move mouse to the glass panel centre and dwell ~1 s so distortion is
 *      clearly framed.
 *   3. Slow drift across the glass surface (left → right → diagonal) to reveal
 *      the chromatic fringing at panel edges.
 *   4. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle — SVG filter + backdrop render
  try { await wait(1500); } catch (_) {}

  // Move to glass panel centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(1000);
  } catch (_) {}

  // Slow drift left → right across glass surface (glass is ~256×160 px)
  try {
    await page.mouse.move(cx - 110, cy - 55, { steps: 10 });
    await wait(200);
    await page.mouse.move(cx + 110, cy + 40, { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Diagonal drift back across the glass
  try {
    await page.mouse.move(cx - 90, cy + 60, { steps: 35 });
    await wait(400);
    await page.mouse.move(cx + 90, cy - 50, { steps: 35 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(500);
  } catch (_) {}
}
