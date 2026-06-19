/**
 * Choreography: CardSwap-TS-TW
 * Behavior: a stack of 3 cards auto-swaps every 3.5s (delay prop). The front
 *   card drops down while the others promote forward, then the dropped card
 *   slides to the back. pauseOnHover is set so we can see a swap cycle cleanly.
 * Strategy: stay off the stack initially so the first auto-swap fires (~3.5s),
 *   capture it mid-animation, then dwell to capture the second swap.
 */

export default async function choreograph(page, { W, H, screenshot }) {
  // CardSwap positions itself bottom-right with translate(5%, 20%); the stack
  // visual center is roughly at 75% W, 70% H in the preview frame.
  const stackCx = Math.round(W * 0.72);
  const stackCy = Math.round(H * 0.62);

  try {
    // 1. Settle – first auto-swap fires at ~3.5s; capture near mount state
    await page.waitForTimeout(600);
    await screenshot('cardswap-initial');

    // 2. Wait for first swap cycle to begin
    await page.waitForTimeout(2800);
    await screenshot('cardswap-swap1-start');

    // 3. Capture mid-swap (drop animation in progress)
    await page.waitForTimeout(800);
    await screenshot('cardswap-swap1-mid');

    // 4. Let swap complete and second card settle as front
    await page.waitForTimeout(1200);
    await screenshot('cardswap-swap1-done');

    // 5. Hover the stack to pause and show the arrangement clearly
    await page.mouse.move(stackCx, stackCy, { steps: 10 });
    await page.waitForTimeout(600);
    await screenshot('cardswap-hover-paused');

    // 6. Move away to resume
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.3), { steps: 12 });
    await page.waitForTimeout(400);
  } catch (err) {
    console.warn('[CardSwap choreograph]', err?.message ?? err);
  }
}
