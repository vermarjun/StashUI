// pointer: a custom SVG arrow-cursor tracks the mouse via fixed positioning
// with motion/react (scale 0→1 on enter, scale 0 on leave). Show: enter the
// component area → slow arcing sweeps across it → gentle spiral toward centre
// → exit for loop seam.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Start outside the component so we capture the enter animation.
  try {
    await page.mouse.move(cx + 300, cy + 150, { steps: 5 });
  } catch (_) {}

  // Settle before entering.
  try {
    await wait(300);
  } catch (_) {}

  // Enter the parent element area — pointer appears with scale animation.
  try {
    await page.mouse.move(cx - 160, cy - 80, { steps: 25 });
    await wait(300);
  } catch (_) {}

  // Arc 1: upper-left to upper-right (slow sweep).
  try {
    await page.mouse.move(cx + 160, cy - 80, { steps: 50 });
    await wait(200);
  } catch (_) {}

  // Arc 2: upper-right to lower-left (crossing diagonal).
  try {
    await page.mouse.move(cx - 120, cy + 80, { steps: 50 });
    await wait(200);
  } catch (_) {}

  // Arc 3: lower-left to lower-right.
  try {
    await page.mouse.move(cx + 120, cy + 80, { steps: 50 });
    await wait(200);
  } catch (_) {}

  // Spiral inward toward centre.
  try {
    await page.mouse.move(cx + 60, cy + 40, { steps: 25 });
    await wait(150);
    await page.mouse.move(cx - 40, cy - 20, { steps: 20 });
    await wait(150);
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(400);
  } catch (_) {}

  // Exit the component area — pointer disappears with exit animation.
  try {
    await page.mouse.move(cx + 300, cy + 150, { steps: 30 });
    await wait(300);
  } catch (_) {}
}
