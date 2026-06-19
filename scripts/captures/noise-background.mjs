/**
 * Capture choreography for: noise-background
 * Behaviour: three radial-gradient layers (pink, blue, yellow) animate via
 * Framer Motion useAnimationFrame with randomised velocity, bouncing within
 * the container bounds (~1.5–3 s per direction change). A static noise.webp
 * overlay is blended on top. Self-animating — no pointer interaction.
 * Strategy: settle ~2 s for the image to load and gradients to start moving,
 * dwell ~4 s to show the gradient blobs traversing the full container, then
 * return mouse to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse at centre so it does not clip the rounded container edges
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 5 });
  } catch (_) {}

  // Settle: noise.webp fetch + motion initialisation + velocity bootstrap
  try {
    await wait(2000);
  } catch (_) {}

  // Dwell phase 1: first direction-change cycle (~1.5 s)
  try {
    await wait(2000);
  } catch (_) {}

  // Dwell phase 2: second direction change, blob fully traverses container
  try {
    await wait(2000);
  } catch (_) {}

  // Return mouse to centre for clean loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 5 });
    await wait(400);
  } catch (_) {}
}
