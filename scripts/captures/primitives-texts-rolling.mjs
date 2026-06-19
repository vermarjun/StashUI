/**
 * Choreography: primitives-texts-rolling
 * Behavior: each character performs a 3D rotateX flip (top face exits 0→90°,
 * new face enters 90→0°) staggered by 0.1s per char. Both RollingText
 * instances have inView=true so they fire on mount. Total animation for the
 * longer phrase (~30 chars × 0.1s stagger + 0.5s duration + 0.3s offset)
 * ≈ 3.8s. Dwell ~3s covers the main wave.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from text so 3D perspective isn't skewed by hover events.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
  } catch (_) {}

  // Short settle for mount + first character starting its flip.
  try {
    await wait(300);
  } catch (_) {}

  // Dwell through the rolling wave — both lines stagger across their chars.
  try {
    await wait(3200);
  } catch (_) {}

  // Hold on the fully settled text.
  try {
    await wait(500);
  } catch (_) {}

  // Return near start.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
