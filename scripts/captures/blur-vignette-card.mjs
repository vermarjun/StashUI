/**
 * Capture choreography for blur-vignette-card (scroll:false).
 *
 * Component: two BlurVignette cards side-by-side. Each card shows a
 * full-bleed image with a blurred vignette overlay and a text article
 * at the bottom. No interactive state — just visual dwell.
 * Strategy: settle, gently drift the mouse from the left card to the
 * right card, dwell on each so the blur edge is visible, then park
 * in the centre.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let images and blur effects render
  try {
    await wait(700);
  } catch (_) {}

  // Left card centre (two cards share the horizontal space)
  const leftCardX = Math.round(W * 0.28);
  const rightCardX = Math.round(W * 0.72);
  const cardY = Math.round(H * 0.5);

  // Move to centre-left of the left card
  try {
    await page.mouse.move(leftCardX, cardY, { steps: 14 });
    await wait(900); // dwell — let the blur vignette show clearly
  } catch (_) {}

  // Drift slowly to the right card
  try {
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(
        leftCardX + (rightCardX - leftCardX) * t,
        cardY
      );
      await wait(35);
    }
    await wait(900); // dwell on right card
  } catch (_) {}

  // Return to horizontal centre and slightly above card bottom (article area)
  try {
    await page.mouse.move(W / 2, Math.round(H * 0.72), { steps: 12 });
    await wait(600);
  } catch (_) {}
}
