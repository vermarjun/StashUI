// svg-shapes-animated: animated stroke-dasharray SVG shapes drawn when ~25%
// of the element enters the viewport (inView, once:true). Dwell long enough
// for the draw animation (~0.72s per path, staggered) to finish, then scroll
// slightly to re-trigger if the component remounts on navigation.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Give the component time to mount and the inView threshold to fire.
  try {
    await wait(400);
  } catch (_) {}

  // Tiny scroll to ensure the component is in the viewport trigger zone.
  try {
    await page.mouse.wheel(0, 60);
    await wait(200);
  } catch (_) {}

  // Park cursor in the center — does not affect SVG rendering.
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}

  // Dwell while the stroke-draw animation plays out (staggered paths).
  try {
    await wait(3000);
  } catch (_) {}

  // Gentle drift to upper-left for visual variety.
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.38), { steps: 25 });
    await wait(600);
  } catch (_) {}

  // Return to center — clean loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(500);
  } catch (_) {}
}
