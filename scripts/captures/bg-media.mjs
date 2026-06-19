/**
 * Capture choreography for bg-media.
 *
 * BackgroundMedia renders a full-bleed image (or video) with an optional
 * overlay tint. The component is static — no animation — so the strategy is
 * a short settle dwell to let the image finish loading, then a slow pan of the
 * mouse to show the component fills the container, followed by a final rest.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle: allow the eager-loaded <img> to paint.
  try {
    await wait(1200);
  } catch (_) {}

  // Slow drift across the image to show the full-bleed layout and overlay.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.3), { steps: 20 });
    await wait(500);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.6), { steps: 30 });
    await wait(700);
  } catch (_) {}

  // For video variant: the play/pause button is bottom-right; hover it briefly.
  try {
    await page.mouse.move(Math.round(W * 0.92), Math.round(H * 0.9), { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Return to centre and dwell so the thumbnail capture is clean.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 18 });
    await wait(1000);
  } catch (_) {}
}
