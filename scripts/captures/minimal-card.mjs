/**
 * Capture choreography for minimal-card
 *
 * MinimalCard has a subtle hover: bg shifts from neutral-50 to neutral-100
 * (light) and the layered box-shadow stack gives a slight lift feel.
 *
 * Strategy:
 *   1. Settle off-card so resting state is visible.
 *   2. Move onto the card — hover activates, background lightens, shadow shifts.
 *   3. Dwell on card so the hover state is captured clearly.
 *   4. Move off — card returns to resting state.
 *   5. Repeat hover dwell once more for the video loop.
 *   6. End off-card near neutral position.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Start off the card
  try {
    await wait(400);
    await page.mouse.move(cx, H * 0.1, { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Hover onto card
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(900);
  } catch (_) {}

  // Move away — rest state
  try {
    await page.mouse.move(cx + 200, H * 0.15, { steps: 14 });
    await wait(600);
  } catch (_) {}

  // Second hover pass
  try {
    await page.mouse.move(cx, cy - 10, { steps: 18 });
    await wait(900);
  } catch (_) {}

  // End off-card
  try {
    await page.mouse.move(cx, H * 0.12, { steps: 14 });
    await wait(400);
  } catch (_) {}
}
