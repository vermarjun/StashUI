/**
 * Capture choreography for canvas-reveal-effect.
 *
 * Effect: hovering each card triggers a dot-matrix shader that fans outward
 * from centre. Strategy:
 *   1. Settle ~600 ms for Three.js canvas to initialise.
 *   2. Hover card 0 (left) → watch reveal spread ~1.2 s.
 *   3. Move to card 1 (centre) → watch reveal ~1.0 s.
 *   4. Move to card 2 (right) → watch reveal ~1.0 s.
 *   5. Slow arc across all cards while still inside the last one.
 *   6. Move mouse off all cards (above) — effect fades.
 *   7. Return to centre for clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Approximate card centres: three cards spread across the demo row (~W*0.18, W*0.5, W*0.82)
  const cardYCentre = Math.round(H * 0.5);
  const cardXs = [
    Math.round(W * 0.18),
    Math.round(W * 0.5),
    Math.round(W * 0.82),
  ];

  // Wait for Three.js canvas paint
  try { await wait(600); } catch (_) {}

  // Hover card 0
  try {
    await page.mouse.move(cardXs[0], cardYCentre, { steps: 8 });
    await wait(1200);
  } catch (_) {}

  // Move to card 1
  try {
    await page.mouse.move(cardXs[1], cardYCentre, { steps: 18 });
    await wait(1000);
  } catch (_) {}

  // Move to card 2
  try {
    await page.mouse.move(cardXs[2], cardYCentre, { steps: 18 });
    await wait(1000);
  } catch (_) {}

  // Slow reverse sweep back across all cards
  try {
    await page.mouse.move(cardXs[0], cardYCentre, { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Move off cards — effect fades
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.05), { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
