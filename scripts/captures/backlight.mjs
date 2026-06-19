// backlight: SVG feGaussianBlur + feColorMatrix filter creates a bloom/glow
// that amplifies the child element's colours. Move the mouse slowly across the
// card so any cursor-reactive elements (like radial gradients) shift with it.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: let the filter and child layout render.
  try { await wait(400); } catch (_) {}

  // Enter from left edge at vertical center.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.5), { steps: 6 });
    await wait(200);
  } catch (_) {}

  // Slow sweep left → right across the component.
  try {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      await page.mouse.move(
        Math.round(W * 0.1 + W * 0.8 * (i / steps)),
        Math.round(H * 0.5 + Math.sin(i / steps * Math.PI) * H * 0.08),
        { steps: 1 }
      );
      await wait(40);
    }
  } catch (_) {}

  // Dwell at right side.
  try { await wait(500); } catch (_) {}

  // Drift back to center for loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 18 });
    await wait(400);
  } catch (_) {}
}
