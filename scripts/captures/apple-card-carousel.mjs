/**
 * Capture choreography: apple-card-carousel (inspira-react)
 *
 * A horizontally scrollable carousel of tall rounded cards (w-56 h-80 on mobile,
 * w-96 h-[40rem] on desktop).  Two round arrow buttons sit below the track —
 * the right one calls `scrollBy({ left: 300 })`, left calls `scrollBy({ left: -300 })`.
 * Clicking a card opens a full-screen expanded overlay with a close (×) button.
 *
 * Strategy:
 *   1. Wait for card buttons to animate in (staggered 0.2 s × 5 = 1 s total; 0.5 s each).
 *   2. Dwell on the initial state.
 *   3. Click the right (next) scroll button 3 × with ~1.1 s dwell each.
 *   4. Click the left (prev) scroll button once to show reverse nav, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the first card button to be visible
  try {
    await page.locator("button.relative.z-10").first().waitFor({
      state: "visible",
      timeout: 12000,
    });
  } catch {
    await wait(2500);
  }

  // Let staggered entrance animations finish (5 cards × 0.2 s delay + 0.5 s = 1.5 s)
  await wait(1600);

  // Locate the right/left scroll arrows (rendered in div.mr-10.flex.justify-end)
  const arrowBtns = page.locator("div.mr-10.flex.justify-end button");

  // Click right arrow 3 times
  for (let i = 0; i < 3; i++) {
    try {
      const count = await arrowBtns.count();
      if (count >= 2) {
        await arrowBtns.nth(1).click();
      } else {
        await page.mouse.click(W * 0.87, H * 0.88);
      }
    } catch (_) {}
    await wait(1100);
  }

  // Brief pause at the scrolled-right position
  await wait(600);

  // Click left arrow once to show reverse navigation
  try {
    const count = await arrowBtns.count();
    if (count >= 2) {
      await arrowBtns.nth(0).click();
    } else {
      await page.mouse.click(W * 0.80, H * 0.88);
    }
  } catch (_) {}

  await wait(1100);
}
