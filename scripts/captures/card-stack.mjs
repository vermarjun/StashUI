/**
 * Capture choreography for card-stack.
 *
 * Effect: the CardStack auto-cycles every 5 s — the bottom card pops to
 * the top with a scale + translate animation. There is no hover interaction
 * so the choreography simply waits to capture two full cycle transitions.
 * Strategy: wait for the component to mount → capture the initial state →
 * wait for the first auto-flip → wait for the second auto-flip → end on the
 * resting (third card) state.
 *
 * Grid speed is 1.6×, so real 5 s interval ≈ 3.1 s in playback.
 * We wait 5.2 s to see one flip, then another 5.2 s for the second.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the stack to be present and mounted
  try {
    await page.locator(".relative.h-60").first().waitFor({
      state: "visible",
      timeout: 8000,
    });
  } catch {
    // continue even if selector misses
  }

  // Initial resting state — give React time to start the interval
  await wait(800);

  // Hover over the stack to show the viewer something is interactive
  // (no click needed — auto-cycle drives the animation)
  let box;
  try {
    const el = page.locator(".relative.h-60").first();
    box = await el.boundingBox();
  } catch {
    box = null;
  }

  if (box) {
    try {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    } catch { /* continue */ }
  }

  // Wait for first card cycle (interval = 5000 ms)
  await wait(5200);

  // Wait for second card cycle
  await wait(5200);

  // Move mouse away — resting state with third card on top
  if (box) {
    try {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height + 40);
    } catch { /* continue */ }
  }

  await wait(400);
}
