/**
 * Choreography: primitives-texts-scrolling-number
 * Behavior: ScrollingNumber translates its column of values from start→end
 * position via a spring (stiffness=90, damping=30). The demo has three
 * containers (numbers 500, 1000, 80 with steps 100/200/20). All have inView=true
 * and fire on mount. Slowest (500/step100 = 5 items, longest travel) finishes
 * in ~2–2.5s. Dwell ~3s for all three to complete their scroll.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in a neutral corner.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
  } catch (_) {}

  // Settle — spring animations start immediately on mount.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell through all three scrolling columns reaching their target.
  try {
    await wait(3000);
  } catch (_) {}

  // Hold on the final settled state.
  try {
    await wait(500);
  } catch (_) {}

  // Return near start for loop cut.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
