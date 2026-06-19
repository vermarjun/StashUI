// magic-ui-lens: a radial magnifying lens follows the cursor, zooming the
// content beneath it (zoomFactor 1.3, lensSize 170px). Show: enter → slow
// sweep across the image in an S-curve → brief dwell → return near start.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Wait for Lens component to mount and motion/react to initialise.
  try {
    await wait(600);
  } catch (_) {}

  // Enter from the left edge of the component area.
  try {
    await page.mouse.move(cx - 180, cy, { steps: 5 });
    await wait(150);
  } catch (_) {}

  // Trigger hover (mouseenter) and let opacity:0→1 scale animation finish.
  try {
    await page.mouse.move(cx - 160, cy, { steps: 3 });
    await wait(200);
  } catch (_) {}

  // Sweep left → right across the upper half (first S-curve leg).
  try {
    await page.mouse.move(cx + 160, cy - 60, { steps: 55 });
    await wait(300);
  } catch (_) {}

  // Sweep right → left across the lower half (second S-curve leg).
  try {
    await page.mouse.move(cx - 160, cy + 60, { steps: 55 });
    await wait(300);
  } catch (_) {}

  // Settle at center — lens clearly visible at rest.
  try {
    await page.mouse.move(cx, cy, { steps: 25 });
    await wait(700);
  } catch (_) {}

  // Drift toward upper-right for loop-seam variety.
  try {
    await page.mouse.move(cx + 100, cy - 80, { steps: 30 });
    await wait(400);
  } catch (_) {}

  // Exit the component area (mouseLeave hides lens) — loop seam.
  try {
    await page.mouse.move(cx + 260, cy + 10, { steps: 20 });
    await wait(300);
  } catch (_) {}
}
