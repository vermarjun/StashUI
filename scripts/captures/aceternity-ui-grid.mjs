/**
 * Capture choreography for aceternity-ui-grid.
 *
 * Shares the same demo as `grid` — same CSS grid background with radial-gradient
 * mask and centre text. No pointer reactivity. Pure dwell + gentle drift.
 * (Identical choreography to grid.mjs — kept as a separate file per convention.)
 */
export default async function capture(page, { W, H, wait }) {
  // No canvas settle needed — purely CSS.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await wait(400);
  } catch (_) {}

  // Gentle drift toward top-right.
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.35), { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Drift to bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.65), { steps: 25 });
    await wait(600);
  } catch (_) {}

  // Return to centre — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 15 });
    await wait(400);
  } catch (_) {}
}
