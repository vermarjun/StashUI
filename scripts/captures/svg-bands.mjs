/**
 * Capture choreography for svg-bands.
 *
 * svg-bands exports multiple SVG decorative section ornaments (BandShape
 * variants, zigzag, wavy, pyramid, etc.). The demo renders five of them
 * stacked vertically in a tall container. All are purely static SVGs — no
 * animation. Strategy: settle briefly, then a slow vertical scroll-pan (mouse
 * move from top to bottom of the page) to show each band shape in sequence,
 * finishing with a short dwell so the last visible band reads clearly.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle.
  try {
    await wait(600);
  } catch (_) {}

  // Start at top — hover first band.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H * 0.1), { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Slow pan downward through each band row.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H * 0.3), { steps: 20 });
    await wait(300);
    await page.mouse.move(Math.round(W / 2), Math.round(H * 0.5), { steps: 20 });
    await wait(300);
    await page.mouse.move(Math.round(W / 2), Math.round(H * 0.7), { steps: 20 });
    await wait(300);
    await page.mouse.move(Math.round(W / 2), Math.round(H * 0.9), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Return to centre for clean thumbnail.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 18 });
    await wait(800);
  } catch (_) {}
}
