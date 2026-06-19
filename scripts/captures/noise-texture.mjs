// noise-texture: static fractal-noise SVG rendered via feTurbulence filter.
// No animation — just dwell so the noise pattern is fully visible.
export default async function capture(page, { W, H, wait }) {
  // Short settle for the SVG filter to render
  try { await wait(400); } catch (_) {}

  // Park mouse near centre — no interaction needed for static noise
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell: let the viewer appreciate the full texture
  try { await wait(3200); } catch (_) {}

  // Slight drift to confirm it is live (not a frozen frame)
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.48), { steps: 10 });
  } catch (_) {}

  try { await wait(1000); } catch (_) {}

  // Return near start for a clean loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
