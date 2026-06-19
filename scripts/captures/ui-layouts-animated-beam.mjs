// ui-layouts-animated-beam: 4 beams connect peripheral nodes (user, claude,
// typescript, react) to a center logo via curved SVG paths with travelling
// gradient highlights. Self-animating. Dwell ~3 s so all beam cycles
// complete at least once.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: let layout measure refs and beam SVGs render.
  try { await wait(500); } catch (_) {}

  // Park mouse near the center logo so all beams are visible.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  // Dwell ~3 s — shortest beam has no explicit delay, longest has curvature
  // offsets that complete within ~3 s at default speed.
  try { await wait(3000); } catch (_) {}

  // Gentle drift toward the user node (left) to show the beam direction.
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.5), { steps: 20 });
  } catch (_) {}
  try { await wait(800); } catch (_) {}

  // Return center for clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 16 });
  } catch (_) {}
  try { await wait(400); } catch (_) {}
}
