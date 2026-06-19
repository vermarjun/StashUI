/**
 * Capture choreography for DotField-TS-TW
 *
 * DotField is a canvas-2D dot grid (no WebGL). Moving the mouse causes dots
 * near the cursor to bulge outward (bulgeOnly=true, bulgeStrength=67).
 * A radial SVG glow follows the cursor. waveAmplitude=4 adds a gentle idle
 * wave even without mouse movement.
 *
 * Strategy:
 *   1. Settle ~2 s for canvas build and first wave cycles.
 *   2. Slow arc sweep from left-centre → top-centre → right-centre to create
 *      a visible bulge trail across the dot field.
 *   3. Tighten to a small clockwise circle in the middle — shows the glow
 *      halo and bulge together.
 *   4. Slide cursor off to bottom-right and dwell ~1.5 s — dots relax back
 *      to their idle wave positions.
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas builds synchronously; short initial settle
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Arc sweep left → top → right across the dot field
  try {
    await page.mouse.move(Math.round(W * 0.15), cy, { steps: 4 });
    await wait(100);
    const arcSteps = 24;
    for (let i = 0; i <= arcSteps; i++) {
      const angle = Math.PI - (i / arcSteps) * Math.PI; // π → 0 (left to right via top)
      const r = Math.round(Math.min(W, H) * 0.32);
      const px = Math.round(cx + r * Math.cos(angle));
      const py = Math.round(cy - r * Math.abs(Math.sin(angle)));
      await page.mouse.move(px, py, { steps: 3 });
      await wait(50);
    }
  } catch (e) {
    console.warn('DotField: arc sweep error', e.message);
  }

  // Small clockwise circle at centre — glow + tight bulge
  try {
    const r = Math.round(Math.min(W, H) * 0.1);
    for (let i = 0; i <= 24; i++) {
      const angle = (i / 24) * 2 * Math.PI;
      const px = Math.round(cx + r * Math.cos(angle));
      const py = Math.round(cy + r * Math.sin(angle));
      await page.mouse.move(px, py, { steps: 2 });
      await wait(40);
    }
  } catch (e) {
    console.warn('DotField: circle error', e.message);
  }

  // Move off to bottom-right; dots relax back to wave
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.85), { steps: 20 });
    await wait(1500);
  } catch (_) {}
}
