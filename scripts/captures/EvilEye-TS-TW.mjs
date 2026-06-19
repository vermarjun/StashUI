/**
 * Capture choreography for EvilEye-TS-TW
 *
 * EvilEye is a WebGL shader of a stylised eye whose pupil tracks the mouse
 * position (pupilFollow). Moving the cursor in slow arcs causes the pupil to
 * rotate and shift, showing the tracking behaviour clearly.
 *
 * Strategy:
 *   1. Settle ~2 s for WebGL + shader to initialise.
 *   2. Slow clockwise arcs across the canvas: left → top → right → bottom.
 *   3. Pause at each quadrant so the eye shift is visible.
 *   4. Return to centre — pupil re-centres — clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // WebGL + shader settle
  try {
    await wait(2000);
  } catch (_) {}

  // Move to centre first
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(300);
  } catch (_) {}

  // Arc 1: centre → left
  try {
    await page.mouse.move(Math.round(W * 0.15), cy, { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Arc 2: left → top
  try {
    await page.mouse.move(cx, Math.round(H * 0.15), { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Arc 3: top → right
  try {
    await page.mouse.move(Math.round(W * 0.85), cy, { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Arc 4: right → bottom
  try {
    await page.mouse.move(cx, Math.round(H * 0.85), { steps: 45 });
    await wait(500);
  } catch (_) {}

  // Return to centre — pupil re-centres
  try {
    await page.mouse.move(cx, cy, { steps: 35 });
    await wait(800);
  } catch (_) {}
}
