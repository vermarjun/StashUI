/**
 * Capture choreography for pointer-highlight.
 *
 * Effect: each PointerHighlight block animates a border rectangle that draws
 * itself in from (0,0) when it enters the viewport, and a pointer icon tracks
 * to the bottom-right corner. Three stacked text blocks in the demo.
 * Strategy:
 *   1. Settle ~800 ms so the whileInView animations fire and borders draw.
 *   2. Dwell at centre of the page so all three blocks are visible.
 *   3. Move mouse slowly from block 1 down through block 2 to block 3.
 *   4. Pause at block 3 so the pointer icon is clearly visible.
 *   5. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);

  // Approximate vertical centres of the three PointerHighlight blocks
  // They are stacked with gap-10 (~40px); total occupied ~H*0.55 centred
  const blockY = [
    Math.round(H * 0.32),
    Math.round(H * 0.5),
    Math.round(H * 0.67),
  ];

  // Settle — trigger whileInView animations
  try { await wait(800); } catch (_) {}

  // Hover block 1
  try {
    await page.mouse.move(cx, blockY[0], { steps: 10 });
    await wait(900);
  } catch (_) {}

  // Move down to block 2
  try {
    await page.mouse.move(cx, blockY[1], { steps: 15 });
    await wait(800);
  } catch (_) {}

  // Move down to block 3
  try {
    await page.mouse.move(cx, blockY[2], { steps: 15 });
    await wait(900);
  } catch (_) {}

  // Slight sideways drift to show pointer icon clearly
  try {
    await page.mouse.move(cx + 40, blockY[2], { steps: 8 });
    await wait(500);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(cx, Math.round(H / 2), { steps: 14 });
    await wait(400);
  } catch (_) {}
}
