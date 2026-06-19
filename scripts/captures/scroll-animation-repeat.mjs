/**
 * Capture choreography for scroll-animation-repeat.
 *
 * The demo (repeat-scroll.tsx) uses ScrollAnimation with once:undefined
 * (defaults to falsy = repeating) so items animate in AND out on every
 * scroll direction change — left/center/right directions per row.
 * Strategy: wheel slowly down (animations trigger), dwell, then wheel
 * back up so they reverse/re-trigger, demonstrating the repeat behaviour.
 */
export default async function capture(page, { W, H, wait }) {
  // Focus scroll container.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.5));
  } catch (_) {}

  try {
    await wait(500);
  } catch (_) {}

  // Scroll down through the grid — items animate in left/center/right.
  try {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 280);
      await wait(180);
    }
  } catch (_) {}

  // Dwell — all current-viewport items fully visible.
  try {
    await wait(800);
  } catch (_) {}

  // Scroll back up so items leave viewport and re-animate (repeat behaviour).
  try {
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, -280);
      await wait(180);
    }
  } catch (_) {}

  // Settle at top — animations have reversed, loop seam is clean.
  try {
    await wait(700);
  } catch (_) {}
}
