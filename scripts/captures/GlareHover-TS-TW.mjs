/**
 * Capture choreography for GlareHover-TS-TW
 *
 * GlareHover renders a single 500×500 card. On `mouseenter` it animates a
 * diagonal linear-gradient (backgroundPosition -100%→100%) over 650 ms so a
 * bright glare streak sweeps across the card. On `mouseleave` it reverses.
 * `playOnce=false` (default) so each enter/leave cycles the animation.
 *
 * Strategy:
 *   1. Mount settle.
 *   2. Locate the glare card; fall back to viewport centre estimate.
 *   3. Sweep mouse from outside → into the card (triggers animateIn).
 *      Dwell for the full 650 ms sweep so the glare is seen mid-travel.
 *   4. Sweep out (triggers animateOut — glare retreats).
 *   5. Repeat once more for a second cycle.
 *   6. End outside the card so the glare is gone at loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(400);
  } catch (_) {}

  // Locate the card
  let cx = W / 2;
  let cy = H / 2;
  let cw = 500;
  let ch = 500;
  try {
    const card = page.locator('[class*="overflow-hidden"][class*="border"]').first();
    const box = await card.boundingBox();
    if (box) {
      cx = box.x + box.width / 2;
      cy = box.y + box.height / 2;
      cw = box.width;
      ch = box.height;
    }
  } catch (_) {}

  const left  = cx - cw / 2 - 30;
  const right = cx + cw / 2 + 30;

  // Cycle 1: enter from left → dwell → leave right
  try {
    await page.mouse.move(left, cy, { steps: 8 });
    await wait(100);
    await page.mouse.move(cx, cy, { steps: 12 }); // triggers mouseenter
    await wait(750); // let full 650 ms glare sweep play
    await page.mouse.move(right, cy, { steps: 10 }); // triggers mouseleave
    await wait(700); // glare retreats
  } catch (_) {}

  // Cycle 2: enter from top, move diagonally across
  try {
    await page.mouse.move(cx - cw * 0.4, cy - ch / 2 - 20, { steps: 8 });
    await wait(100);
    await page.mouse.move(cx + cw * 0.4, cy + ch * 0.3, { steps: 20 }); // enter + sweep
    await wait(750);
    await page.mouse.move(cx + cw * 0.4, cy + ch / 2 + 20, { steps: 8 }); // exit bottom
    await wait(700);
  } catch (_) {}

  // End to the left, outside card — loop seam is glare-free
  try {
    await page.mouse.move(left, cy, { steps: 10 });
    await wait(200);
  } catch (_) {}
}
