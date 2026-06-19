/**
 * Capture choreography for ClickSpark-TS-TW
 *
 * ClickSpark renders a full-bleed canvas overlay; clicking anywhere within
 * the `div.relative.w-full.h-full` fires a burst of 8 spark lines that
 * radiate outward and shrink over ~400 ms.
 *
 * Strategy:
 *   1. Mount settle.
 *   2. Click six spots spread across the canvas — centre, four quadrant
 *      positions, then back near centre — with short pauses between so
 *      consecutive sparks don't fully overlap and each burst is visible.
 *   3. End near the start so the loop is smooth.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(400);
  } catch (_) {}

  const spots = [
    [W * 0.5, H * 0.5],
    [W * 0.28, H * 0.35],
    [W * 0.72, H * 0.35],
    [W * 0.72, H * 0.65],
    [W * 0.28, H * 0.65],
    [W * 0.5, H * 0.45]
  ];

  for (const [x, y] of spots) {
    try {
      // Glide to the spot first so the cursor is visible arriving
      await page.mouse.move(x, y, { steps: 10 });
      await wait(120);
      await page.mouse.click(x, y);
      // Let the 400 ms burst animation play before the next click
      await wait(480);
    } catch (_) {}
  }

  // Dwell so the last sparks finish
  try {
    await wait(300);
  } catch (_) {}

  // Return to centre so loop seam is clean
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await wait(200);
  } catch (_) {}
}
