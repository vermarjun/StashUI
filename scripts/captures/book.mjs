/**
 * Capture choreography for book
 *
 * The Book component is a 3D CSS-transform book. On hover (group-hover) it
 * rotates to a -30deg open pose revealing the spine and back face. The demo
 * shows three books side by side; one is `isStatic` (always open).
 * Strategy:
 *   1. Settle ~500 ms.
 *   2. Hover the first book (indigo, interactive) — it rotates open.
 *   3. Dwell to show the open state.
 *   4. Move to the third book (emerald, interactive) — it rotates open.
 *   5. Dwell.
 *   6. Return mouse to neutral (between books, not hovering) so all close
 *      for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle
  try { await wait(500); } catch (_) {}

  // Hover first book — locate by searching for the group wrapper
  // The three books are centred; first is roughly at W*0.28
  try {
    await page.mouse.move(Math.round(W * 0.28), Math.round(H * 0.48), { steps: 10 });
    await wait(1200); // wait for CSS transition (duration=1000 ms)
  } catch (_) {}

  // Move to the third book (~W*0.72)
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.48), { steps: 16 });
    await wait(1200);
  } catch (_) {}

  // Move to neutral — no book hovered, all animated books close
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.12), { steps: 14 });
    await wait(1200);
  } catch (_) {}
}
