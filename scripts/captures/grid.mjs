/**
 * Capture choreography for grid.
 *
 * Effect: static CSS grid pattern (bg-grid-white/[0.1]) with a radial-gradient
 * mask that fades the grid toward the edges. The text "Backgrounds" sits in the
 * centre. No pointer reactivity — pure CSS, no settle time needed.
 * Strategy: brief dwell at the centre so the gradient mask is fully visible,
 * then end near start.
 */
export default async function capture(page, { W, H, wait }) {
  // Grid is purely CSS — no canvas settle required.
  // Dwell at centre so the radial-gradient vignette is clearly captured.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await wait(400);
  } catch (_) {}

  // Gentle drift toward top-right to show off the grid pattern at an angle.
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.35), { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Drift to bottom-left corner.
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.65), { steps: 25 });
    await wait(600);
  } catch (_) {}

  // Return near centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
    await wait(400);
  } catch (_) {}
}
