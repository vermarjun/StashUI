// primitives-effects-click: <Click /> attaches a pointerup listener to
// document and renders SVG/div effects (ring variant by default) at the exact
// click coords via a fixed portal. Click several spots around the viewport to
// showcase the ripple/ring animation.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Let the component mount and attach the pointerup listener.
  try {
    await wait(500);
  } catch (_) {}

  // Click 1 — upper-left quadrant.
  try {
    await page.mouse.move(Math.round(W * 0.28), Math.round(H * 0.3), { steps: 10 });
    await wait(100);
    await page.mouse.click(Math.round(W * 0.28), Math.round(H * 0.3));
    await wait(700);
  } catch (_) {}

  // Click 2 — upper-right quadrant.
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.3), { steps: 15 });
    await wait(100);
    await page.mouse.click(Math.round(W * 0.72), Math.round(H * 0.3));
    await wait(700);
  } catch (_) {}

  // Click 3 — center.
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(100);
    await page.mouse.click(cx, cy);
    await wait(700);
  } catch (_) {}

  // Click 4 — lower-left quadrant.
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.68), { steps: 15 });
    await wait(100);
    await page.mouse.click(Math.round(W * 0.3), Math.round(H * 0.68));
    await wait(700);
  } catch (_) {}

  // Click 5 — lower-right quadrant.
  try {
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.68), { steps: 15 });
    await wait(100);
    await page.mouse.click(Math.round(W * 0.7), Math.round(H * 0.68));
    await wait(700);
  } catch (_) {}

  // Return cursor to center — loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(300);
  } catch (_) {}
}
