/**
 * Capture choreography for inspira-progressive-blur (file: progressive-blur.demo.tsx).
 *
 * Effect: three side-by-side cards each show a photo overlaid with a stepped
 * backdrop-filter blur that fades in progressively from one edge (bottom, top,
 * right). The effect is always-on CSS — no pointer interaction required.
 *
 * Strategy:
 *   1. Settle ~500 ms for blur layers and mask gradients to paint.
 *   2. Park pointer at left-centre to avoid casting hover shadows over the cards.
 *   3. Dwell ~1.5 s so all three blur zones are fully visible.
 *   4. Gentle slow drift horizontally across the three cards (left → centre →
 *      right) to let the viewer compare bottom-, top-, and right-blur variants.
 *   5. Drift back left, then return to start for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cy = Math.round(H / 2);

  // Settle
  try { await wait(500); } catch (_) {}

  // Park at left side of the card row
  try {
    await page.mouse.move(Math.round(W * 0.12), cy, { steps: 8 });
  } catch (_) {}

  // Dwell — blur layers fully visible
  try { await wait(1500); } catch (_) {}

  // Slow drift left → right across all three cards
  try {
    await page.mouse.move(Math.round(W * 0.88), Math.round(H * 0.48), { steps: 60 });
    await wait(600);
  } catch (_) {}

  // Gentle downward drift on the right card (into its blur zone)
  try {
    await page.mouse.move(Math.round(W * 0.86), Math.round(H * 0.65), { steps: 20 });
    await wait(500);
  } catch (_) {}

  // Drift back left across the cards
  try {
    await page.mouse.move(Math.round(W * 0.14), Math.round(H * 0.52), { steps: 55 });
    await wait(500);
  } catch (_) {}

  // Return to start position for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.12), cy, { steps: 16 });
    await wait(400);
  } catch (_) {}
}
