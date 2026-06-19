/**
 * Capture choreography for pixelated-canvas.
 *
 * Effect: a dot-grid rendering of an image reacts to the cursor with a swirl
 * distortion (default mode). Dots near the pointer rotate around it; moving
 * the mouse leaves a trailing wake. Strategy:
 *   1. Settle ~800 ms for image to load and first frame to render.
 *   2. Enter canvas at top-left → slow sweep to bottom-right (diagonal).
 *   3. Pause at centre — swirl fully active.
 *   4. Slow circular arc around the centre to show persistent wake.
 *   5. Drift to top-right corner.
 *   6. Return to canvas centre so fadeOnLeave begins and loop is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas is 480×320 centred; estimate bounds
  const cw = Math.round(W * 0.5);
  const ch = Math.round(cw * (320 / 480));
  const left  = Math.round((W - cw) / 2);
  const top   = Math.round((H - ch) / 2 - H * 0.03);
  const right = left + cw;
  const bot   = top  + ch;
  const cx    = Math.round((left + right) / 2);
  const cy    = Math.round((top  + bot)  / 2);

  // Settle
  try { await wait(800); } catch (_) {}

  // Enter at top-left of canvas
  try {
    await page.mouse.move(left + 20, top + 20, { steps: 6 });
    await wait(200);
  } catch (_) {}

  // Slow diagonal sweep to bottom-right
  try {
    await page.mouse.move(right - 20, bot - 20, { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Arc back to centre
  try {
    await page.mouse.move(cx, cy, { steps: 22 });
    await wait(600);
  } catch (_) {}

  // Slow circular arc around centre (clockwise, 8 steps)
  try {
    const radius = Math.round(cw * 0.25);
    const steps  = 8;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const mx = cx + Math.round(radius * Math.cos(angle));
      const my = cy + Math.round(radius * Math.sin(angle));
      await page.mouse.move(mx, my, { steps: 12 });
      await wait(80);
    }
    await wait(300);
  } catch (_) {}

  // Drift to top-right
  try {
    await page.mouse.move(right - 30, top + 25, { steps: 25 });
    await wait(350);
  } catch (_) {}

  // Return to centre for loop seam (fadeOnLeave kicks in when mouse leaves)
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(400);
  } catch (_) {}
}
