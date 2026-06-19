/**
 * Capture choreography for Cubes-TS-TW
 *
 * Cubes renders a 10×10 grid of 3-D cubes inside `div.relative.w-1/2.aspect-square`.
 * Moving the pointer over the grid tilts cubes within a radius of 3 cells around
 * the cursor (via GSAP rotateX/rotateY). Clicking fires a ripple that colours
 * cubes outward in rings. `autoAnimate=true` means the grid self-animates when
 * the user is idle (simulated pointer wanders).
 *
 * Strategy:
 *   1. Allow autoAnimate to play for a moment so the grid shows initial activity.
 *   2. Move mouse over the grid in a slow diagonal sweep (top-left → bottom-right)
 *      so the tilt wave rolls across all 10×10 cells visibly.
 *   3. Click centre to fire a ripple.
 *   4. Move off the grid so user-active flag clears and the grid springs back.
 *   5. End position matches approximate start for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Let autoAnimate run briefly
  try {
    await wait(1200);
  } catch (_) {}

  // Locate the cube grid; fall back to a centre-based estimate
  let gx = W * 0.25;
  let gy = H * 0.1;
  let gw = W * 0.5;
  let gh = H * 0.8;
  try {
    const grid = page.locator('.cube').first();
    const box = await grid.boundingBox();
    if (box) {
      // Get the parent grid container bounds
      const parent = page.locator('[class*="aspect-square"]').first();
      const pb = await parent.boundingBox();
      if (pb) {
        gx = pb.x;
        gy = pb.y;
        gw = pb.width;
        gh = pb.height;
      }
    }
  } catch (_) {}

  const cx = gx + gw / 2;
  const cy = gy + gh / 2;

  // Slow diagonal sweep: top-left to bottom-right across the grid
  try {
    await page.mouse.move(gx + gw * 0.1, gy + gh * 0.1, { steps: 14 });
    await wait(200);
    await page.mouse.move(gx + gw * 0.9, gy + gh * 0.9, { steps: 40 });
    await wait(300);
  } catch (_) {}

  // Sweep back: bottom-right to top-right
  try {
    await page.mouse.move(gx + gw * 0.9, gy + gh * 0.1, { steps: 30 });
    await wait(200);
  } catch (_) {}

  // Slow horizontal sweep at mid-height
  try {
    await page.mouse.move(gx + gw * 0.1, gy + gh * 0.5, { steps: 30 });
    await wait(200);
  } catch (_) {}

  // Click centre to fire ripple
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(200);
    await page.mouse.click(cx, cy);
    // Let ripple propagate (rippleSpeed=2 → ~0.75 s for full grid)
    await wait(900);
  } catch (_) {}

  // Move off the grid so autoAnimate resumes
  try {
    await page.mouse.move(W * 0.1, H / 2, { steps: 18 });
    await wait(700);
  } catch (_) {}

  // Return to near autoAnimate start
  try {
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 12 });
    await wait(200);
  } catch (_) {}
}
