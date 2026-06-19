/**
 * Choreography: BounceCards-TS-TW
 * Behavior: 5 overlapping cards bounce in on mount (gsap elastic), then on
 *   hover the hovered card straightens and siblings push outward.
 * Strategy: wait for bounce-in animation, then hover each card in sequence
 *   to trigger the push effect, dwell on card 3 (center) longest.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Card positions relative to center (5 cards, transform offsets approx)
  // transformStyles: rotate+translate(-170,-85, 0, +85, +170)
  const cardOffsets = [-170, -85, 0, 85, 170];

  try {
    // 1. Wait for bounce-in animation (animationDelay 0.3 + elastic duration ~1.2s)
    await page.waitForTimeout(1800);
    await screenshot('bounce-in-complete');

    // 2. Hover card 1 (leftmost)
    await page.mouse.move(cx + cardOffsets[0], cy, { steps: 10 });
    await page.waitForTimeout(550);
    await screenshot('hover-card-1');

    // 3. Hover center card (card 3)
    await page.mouse.move(cx + cardOffsets[2], cy, { steps: 14 });
    await page.waitForTimeout(600);
    await screenshot('hover-card-center');

    // 4. Hover card 5 (rightmost)
    await page.mouse.move(cx + cardOffsets[4], cy, { steps: 14 });
    await page.waitForTimeout(550);
    await screenshot('hover-card-5');

    // 5. Move away to reset, return to center
    await page.mouse.move(cx, cy - 160, { steps: 10 });
    await page.waitForTimeout(400);
    await page.mouse.move(cx, cy, { steps: 8 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.warn('[BounceCards choreograph]', err?.message ?? err);
  }
}
