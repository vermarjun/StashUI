// blur-vignette: a rounded container that applies a progressive blurred
// vignette mask around its edges. Static visual — dwell with a gentle
// mouse drift across the card to show the effect is crisp.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: let content render.
  try { await wait(500); } catch (_) {}

  // Park mouse at center of the vignette card.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  // Dwell ~2 s.
  try { await wait(2000); } catch (_) {}

  // Gentle diagonal drift to show the blur edge is not a screenshot artifact.
  try {
    await page.mouse.move(Math.round(W * 0.62), Math.round(H * 0.55), { steps: 20 });
  } catch (_) {}
  try { await wait(1200); } catch (_) {}

  // Drift back to center.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 16 });
  } catch (_) {}
  try { await wait(500); } catch (_) {}
}
