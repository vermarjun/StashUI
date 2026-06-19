// animated-beam: SVG beams animate between node pairs (A→B, C→D) with a
// travelling gradient along a curved path. Self-animating (motion/react).
// Dwell ~3s so both beam cycles complete at least once, then a gentle hover.
export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: let layout stabilise and beam animation initialise.
  try { await wait(400); } catch (_) {}

  // Park mouse near center so no accidental hover states distort layout.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  // Dwell ~3 s — beam A→B has duration=3, beam C→D has duration=4+delay=1.
  // This window captures the first full pass of both beams.
  try { await wait(3000); } catch (_) {}

  // Slight drift to show the beams are live (not a static screenshot).
  try {
    await page.mouse.move(Math.round(W * 0.55), Math.round(H * 0.48), { steps: 14 });
  } catch (_) {}

  try { await wait(1200); } catch (_) {}

  // Return near start for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
