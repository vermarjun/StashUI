// edge-blur: a fixed CSS backdrop-filter overlay that progressively blurs the
// bottom (or top) edge of whatever is behind it. Pure visual effect — no
// interaction needed. A gentle mouse drift lets the viewer sense depth.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);

  // Settle — let the blur layers and mask gradients render.
  try {
    await wait(600);
  } catch (_) {}

  // Park cursor in the clear zone (upper-center).
  try {
    await page.mouse.move(cx, Math.round(H * 0.3), { steps: 10 });
    await wait(1000);
  } catch (_) {}

  // Slow drift downward toward the blur zone.
  try {
    await page.mouse.move(Math.round(W * 0.45), Math.round(H * 0.55), { steps: 35 });
    await wait(700);
  } catch (_) {}

  // Continue into the heavy blur zone at the bottom.
  try {
    await page.mouse.move(Math.round(W * 0.55), Math.round(H * 0.78), { steps: 30 });
    await wait(700);
  } catch (_) {}

  // Drift back up to the clear zone — closes the loop seam.
  try {
    await page.mouse.move(cx, Math.round(H * 0.32), { steps: 40 });
    await wait(600);
  } catch (_) {}
}
