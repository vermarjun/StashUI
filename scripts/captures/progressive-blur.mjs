// progressive-blur: a stepped backdropFilter overlay fades content near the
// bottom edge. Self-rendering CSS — no interaction required. Gentle mouse
// drift gives the capture a sense of depth/life against the blurred edge.
export default async function capture(page, { W, H, wait }) {
  // Settle: let the blur layers paint and mask gradients resolve.
  try {
    await wait(500);
  } catch (_) {}

  // Park mouse at center-left, out of the blur zone.
  try {
    await page.mouse.move(W * 0.4, H * 0.35, { steps: 8 });
  } catch (_) {}

  // Dwell so the blur effect is fully visible at rest.
  try {
    await wait(1200);
  } catch (_) {}

  // Slow drift downward into the blur zone — lets the viewer trace the gradient.
  try {
    await page.mouse.move(W * 0.5, H * 0.55, { steps: 40 });
    await wait(700);
  } catch (_) {}

  // Continue to the bottom of the blur zone.
  try {
    await page.mouse.move(W * 0.55, H * 0.72, { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Drift back up toward the clear zone — closes the loop seam.
  try {
    await page.mouse.move(W * 0.45, H * 0.38, { steps: 40 });
    await wait(500);
  } catch (_) {}

  // Final settle near start.
  try {
    await page.mouse.move(W * 0.4, H * 0.35, { steps: 20 });
    await wait(400);
  } catch (_) {}
}
