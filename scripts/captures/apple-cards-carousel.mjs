/**
 * Capture choreography: apple-cards-carousel
 *
 * A horizontally-scrollable card carousel with arrow buttons (IconArrowNarrowLeft /
 * IconArrowNarrowRight rendered as SVG inside round bg-gray-100 buttons).
 * The right-arrow button scrolls the track 300 px to the right per click.
 * Strategy:
 *   1. Wait for cards to animate in (staggered 0.5 s each × 5 cards ≈ 2.5 s total).
 *   2. Find the right-arrow scroll button and click it 3 × with ~1.2 s dwell.
 *   3. Dwell on the right-scrolled state, then click the left arrow once to
 *      return partway — this shows the full navigation loop.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for at least one card to be visible
  try {
    await page.locator("button.relative.z-10").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch {
    await wait(2500);
  }

  // Let all card entrance animations finish
  await wait(2800);

  // Locate the right (next) scroll arrow button — it is the second of the two
  // round bg-gray-100 control buttons rendered after the scroll track.
  let rightBtn = null;
  try {
    // Both arrows share "rounded-full bg-gray-100" — the right one is :last-child
    const btns = page.locator(
      "div.mr-10.flex.justify-end button"
    );
    const count = await btns.count();
    if (count >= 2) {
      rightBtn = btns.nth(1);
    } else if (count === 1) {
      rightBtn = btns.nth(0);
    }
  } catch {
    // ignore
  }

  // Click right arrow 3 times, dwelling between each
  for (let i = 0; i < 3; i++) {
    try {
      if (rightBtn) {
        await rightBtn.click();
      } else {
        // Fallback: click the right third of the viewport near bottom controls
        await page.mouse.click(W * 0.88, H * 0.9);
      }
    } catch {
      // ignore
    }
    await wait(1200);
  }

  // Dwell on the advanced position
  await wait(1000);

  // Click left arrow once to show reverse navigation
  let leftBtn = null;
  try {
    const btns = page.locator("div.mr-10.flex.justify-end button");
    const count = await btns.count();
    if (count >= 2) {
      leftBtn = btns.nth(0);
    }
  } catch {
    // ignore
  }

  try {
    if (leftBtn) {
      await leftBtn.click();
    }
  } catch {
    // ignore
  }

  await wait(1200);
}
