/**
 * Capture choreography for spotlight-card3
 *
 * Uses HoverFocusSpotlight — the radial highlight snaps to the card when
 * the pointer enters and tracks movement within it. Goal: show the spotlight
 * sweeping slowly across the card surface.
 *
 * Strategy:
 *   1. Settle at centre.
 *   2. Enter the card from the left and sweep right — spotlight follows.
 *   3. Arc top-to-bottom diagonally so the glow is clearly visible.
 *   4. Return to centre to close the loop cleanly.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Settle
  try {
    await wait(400);
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Sweep left-to-right across the card, slightly above centre
  try {
    await page.mouse.move(cx - 160, cy - 40, { steps: 6 });
    await wait(150);
    await page.mouse.move(cx + 160, cy - 40, { steps: 50 });
    await wait(500);
  } catch (_) {}

  // Diagonal arc: top-right to bottom-left
  try {
    await page.mouse.move(cx - 140, cy + 80, { steps: 40 });
    await wait(500);
  } catch (_) {}

  // Sweep back to top-right corner of card
  try {
    await page.mouse.move(cx + 130, cy - 80, { steps: 38 });
    await wait(400);
  } catch (_) {}

  // Slow drift back to centre — resting position
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(500);
  } catch (_) {}
}
