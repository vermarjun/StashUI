/**
 * Capture choreography for spotlight-card4
 *
 * Uses ProximitySpotlight — the glow activates when the pointer is near the
 * card even outside its bounds, and brightens on hover. Move slowly so the
 * proximity fade-in and tracking are both visible.
 *
 * Strategy:
 *   1. Start outside the card (slightly above), approach slowly.
 *   2. Cross the card left-to-right at a shallow angle.
 *   3. Linger near the right edge so the spotlight peaks.
 *   4. Drift diagonally out below-left, then return to card centre.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Approach from above-left, outside the card
  try {
    await wait(300);
    await page.mouse.move(cx - 220, cy - 160, { steps: 8 });
    await wait(200);
  } catch (_) {}

  // Slow approach toward card — proximity glow begins
  try {
    await page.mouse.move(cx - 160, cy - 40, { steps: 35 });
    await wait(300);
  } catch (_) {}

  // Sweep across card surface right — spotlight tracks
  try {
    await page.mouse.move(cx + 180, cy + 30, { steps: 55 });
    await wait(600);
  } catch (_) {}

  // Linger on right edge
  try {
    await page.mouse.move(cx + 180, cy - 30, { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Drift diagonally toward bottom-left of card
  try {
    await page.mouse.move(cx - 120, cy + 70, { steps: 40 });
    await wait(400);
  } catch (_) {}

  // Return to card centre — resting frame
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(500);
  } catch (_) {}
}
