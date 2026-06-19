/**
 * Capture choreography for Radar-TS-TW
 *
 * Radar renders a CSS/canvas radar display with a continuously rotating sweep
 * hand. enableMouseInteraction is true in the demo so moving the mouse nudges
 * the sweep direction slightly. The default sweepSpeed of 1.0 completes one
 * revolution in ~2 s.
 *
 * Strategy:
 *   1. Settle ~1.5 s for mount and first sweep tick to draw.
 *   2. Dwell ~3 s to show at least one full revolution cleanly.
 *   3. Gentle mouse drift — hover near the radar circle to engage interaction.
 *   4. Return to centre for clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Mount + first render settle
  try {
    await wait(1500);
  } catch (_) {}

  // Position cursor at centre — engages mouse interaction
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(200);
  } catch (_) {}

  // Dwell to show the sweep rotating
  try {
    await wait(1500);
  } catch (_) {}

  // Gentle drift: drift to upper-right quadrant then back
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.35), { steps: 40 });
    await wait(600);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.65), { steps: 40 });
    await wait(600);
  } catch (_) {}

  // Dwell at lower-left to show sweep continuing
  try {
    await wait(800);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 25 });
    await wait(500);
  } catch (_) {}
}
