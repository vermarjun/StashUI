// ripple: 8 concentric rings expand outward with staggered animate-ripple
// (scale 1→1.8, opacity 0.24→0 over ~2 s each, offset by 0.06 s per ring).
// Self-animating CSS — no interaction needed. Dwell ~3 s to show full cycle.
export default async function capture(page, { W, H, wait }) {
  // Park mouse well away from centre so it doesn't obscure the rings.
  try {
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 5 });
  } catch (_) {}

  // Settle: let rings mount and first frame render.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell: ~3 s covers at least one full ripple cycle (~2 s + stagger tails).
  try {
    await wait(3000);
  } catch (_) {}

  // Keep mouse parked — no need to move back; loop seam is animation-based.
  try {
    await wait(200);
  } catch (_) {}
}
