/**
 * Capture choreography for cutout-card
 *
 * CutoutCard has rich hover behaviour:
 *   - Shadow intensifies and border brightens (cutoutCardSurfaceShadowClassName)
 *   - Inner image scales up (group-hover/cutout:scale-105)
 *   - CutoutCardAction regions animate in (translateY 8px → 0, opacity 0 → 1)
 *
 * Strategy:
 *   1. Settle off-card so resting state is seen.
 *   2. Move onto the card — hover triggers image zoom + action reveal + shadow lift.
 *   3. Dwell on hover.
 *   4. Retreat — card rests.
 *   5. Hover again — second pass to fill the video loop.
 *   6. End off-card.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Off-card initial position
  try {
    await wait(450);
    await page.mouse.move(cx, H * 0.08, { steps: 6 });
    await wait(350);
  } catch (_) {}

  // Move onto card — slow approach so shadow transition reads
  try {
    await page.mouse.move(cx, cy, { steps: 24 });
    await wait(1000);
  } catch (_) {}

  // Drift slightly to show image parallax scale
  try {
    await page.mouse.move(cx + 60, cy - 40, { steps: 16 });
    await wait(500);
    await page.mouse.move(cx - 60, cy + 40, { steps: 16 });
    await wait(500);
  } catch (_) {}

  // Move off
  try {
    await page.mouse.move(cx + 260, H * 0.12, { steps: 18 });
    await wait(550);
  } catch (_) {}

  // Second hover pass
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(900);
  } catch (_) {}

  // End off-card
  try {
    await page.mouse.move(cx, H * 0.08, { steps: 14 });
    await wait(400);
  } catch (_) {}
}
