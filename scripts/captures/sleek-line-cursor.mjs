// sleek-line-cursor: 20 trailing line segments follow the cursor with spring
// physics (friction 0.5, dampening 0.25, tension 0.98). Move slowly in broad
// arcs so the elastic lag and ribbon-tail are clearly visible on the black bg.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Start at left-centre — well inside the dark container.
  try {
    await page.mouse.move(Math.round(W * 0.18), cy, { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Arc 1: left-centre → top-right (slow, 35 steps).
  try {
    await page.mouse.move(Math.round(W * 0.80), Math.round(H * 0.22), { steps: 35 });
    await wait(150);
  } catch (_) {}

  // Arc 2: top-right → bottom-centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.78), { steps: 30 });
    await wait(150);
  } catch (_) {}

  // Arc 3: bottom-centre → bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.72), { steps: 28 });
    await wait(150);
  } catch (_) {}

  // Arc 4: sweep back up through centre.
  try {
    await page.mouse.move(cx, cy, { steps: 28 });
    await wait(180);
  } catch (_) {}

  // Arc 5: centre → top-left (return toward start, closing the arc).
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 28 });
    await wait(400);
  } catch (_) {}

  // Let trail settle to near-rest.
  try { await wait(500); } catch (_) {}

  // End near start position.
  try {
    await page.mouse.move(Math.round(W * 0.18), cy, { steps: 20 });
    await wait(300);
  } catch (_) {}
}
