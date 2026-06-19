/**
 * Capture choreography for logo-origami.
 *
 * Effect: a split-flap / origami card flip cycles through 4 panels
 * (⚛️ React → ▲ Next → TS → 🌊 Tailwind). Each flip takes 1.5 s
 * (duration) and fires every 2.5 s (delay). The animation is purely
 * CSS/Framer Motion — no pointer interaction required.
 *
 * Strategy:
 *   1. Settle ~500 ms for component mount and first paint.
 *   2. Dwell long enough to capture at least two full flip cycles
 *      (2 × (1.5 + 2.5) = 8 s total); park the pointer off-centre so
 *      the card is not obscured.
 *   3. End near the start position for a clean loop seam.
 *
 * Total active dwell: ~8 s captures two complete transitions.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle
  try { await wait(500); } catch (_) {}

  // Park pointer to the side so the card is unobscured
  try {
    await page.mouse.move(Math.round(W * 0.72), cy, { steps: 8 });
  } catch (_) {}

  // Dwell — first flip begins ~2.5 s after mount and runs for 1.5 s
  try { await wait(4500); } catch (_) {}

  // Gentle drift downward during second cycle (adds life)
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.62), { steps: 20 });
    await wait(4000);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(Math.round(W * 0.72), cy, { steps: 15 });
    await wait(400);
  } catch (_) {}
}
