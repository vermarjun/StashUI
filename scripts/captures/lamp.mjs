/**
 * Capture choreography for lamp.
 *
 * Effect: a conic-gradient lamp glow (cyan) fans out from the top-centre,
 * growing from 15rem → 30rem width via Framer Motion `whileInView`. A bright
 * cyan horizontal line appears at the apex; below it the slate-950 bg covers
 * the gradient to give a "lamp shining down" illusion. The heading text fades
 * in from y:100 → y:0.
 *
 * Strategy:
 *   1. Scroll slightly into view (0 → 1 px) to trigger `whileInView` — the
 *      motion components start at reduced opacity/width.
 *   2. Wait ~1.2 s for the 0.8 s expand + 0.3 s delay animations to complete.
 *   3. Dwell for ~2.5 s with mouse near the lamp apex (top-centre) to let
 *      the glow saturate the preview.
 *   4. Slow pan to bottom-centre so the text is fully visible.
 *   5. Return to top-centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Trigger whileInView by scrolling 1 px.
  try {
    await page.evaluate(() => window.scrollBy(0, 1));
    await wait(200);
  } catch (_) {}

  // Wait for expand animations (delay 0.3 s + duration 0.8 s = ~1.1 s).
  try { await wait(1200); } catch (_) {}

  // Dwell near lamp apex (top-centre, approx 30% down).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.3), { steps: 8 });
    await wait(2500);
  } catch (_) {}

  // Pan down slowly so the heading text enters frame.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.65), { steps: 30 });
    await wait(800);
  } catch (_) {}

  // Return to lamp apex — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.3), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
