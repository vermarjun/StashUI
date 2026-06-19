/**
 * Capture choreography for liquid-logo.
 *
 * Effect: WebGL2 shader renders a liquid-metal distortion over a parsed logo
 * SVG (Amazon logo). Uses requestAnimationFrame for continuous animation.
 * Headless WebGL may be blank — orchestrator falls back automatically.
 *
 * Strategy:
 *   1. Settle ~2.5 s — WebGL2 context, shader compile, logo image parse,
 *      and showProcessing spinner → hidden all need to complete.
 *   2. Dwell at frame centre ~3 s so liquid ripple animation fills several
 *      frames and is clearly visible.
 *   3. Very slow pointer drift (logo canvas is 256×256 at centre) — some
 *      implementations use mouse position as a distortion origin, so gentle
 *      drift may add variety.
 *   4. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Settle — WebGL2 + image parse + first animation frames
  try { await wait(2500); } catch (_) {}

  // Park at canvas centre
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}

  // Dwell so liquid animation accumulates visible frames
  try { await wait(3000); } catch (_) {}

  // Gentle drift around the logo — slow circles to avoid abrupt moves
  try {
    await page.mouse.move(cx - 80, cy - 60, { steps: 25 });
    await wait(400);
    await page.mouse.move(cx + 80, cy - 60, { steps: 30 });
    await wait(400);
    await page.mouse.move(cx + 80, cy + 60, { steps: 30 });
    await wait(400);
    await page.mouse.move(cx - 80, cy + 60, { steps: 30 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(500);
  } catch (_) {}
}
