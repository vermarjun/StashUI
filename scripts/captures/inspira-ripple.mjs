// inspira-ripple: two sets of concentric CSS-animated ripple rings
// (sky-blue and violet variants side by side). Pure CSS animation —
// no mouse interaction drives the rings. Dwell ~3 s to capture a full
// 2-second wave cycle across all staggered circles.
export default async function capture(page, { W, H, wait }) {
  // Park mouse near top-left corner — away from both circle centres —
  // so it doesn't occlude the rings or alter hover state.
  try {
    await page.mouse.move(Math.round(W * 0.08), Math.round(H * 0.08), { steps: 5 });
  } catch (_) {}

  // Let component mount and first animation frame render.
  try { await wait(400); } catch (_) {}

  // Dwell: 3 s covers ≥1.5 full ripple cycles (wave period ≈ 2 s + stagger tails).
  try { await wait(3000); } catch (_) {}

  // Brief final settle — no need to move; loop seam is CSS-animation-based.
  try { await wait(200); } catch (_) {}
}
