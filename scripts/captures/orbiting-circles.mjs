// orbiting-circles: icons orbit a center hub on an SVG ring, driven by
// CSS animate-orbit. Fully self-animating. Dwell ~3s to show rotation arc.
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse off-center so it doesn't obscure the orbit ring.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.15), { steps: 6 });
  } catch (_) {}

  // Wait for CSS animation to begin (first paint + RAF tick).
  try { await wait(300); } catch (_) {}

  // Dwell ~3s — enough to see icons travel ~¼ revolution at default speed.
  try { await wait(3000); } catch (_) {}

  // Gentle drift toward center for visual context, then back.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 18 });
    await wait(600);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.15), { steps: 18 });
    await wait(300);
  } catch (_) {}
}
