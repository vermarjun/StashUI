/**
 * Capture choreography for: components-backgrounds-gradient
 * Behaviour: motion.div with animated backgroundPosition on a
 * bg-gradient-to-br (blue→purple→pink). The background-size is 400% so
 * position animation creates a slow colour-wave effect (duration: 15 s,
 * repeat: Infinity). Very smooth, no pointer interaction needed.
 * Short settle + dwell enough to see position shift.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the motion animation start (it begins immediately on mount)
  try {
    await wait(400);
  } catch (_) {}

  // Park mouse at centre — gradient fills the entire viewport
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch (_) {}

  // Dwell phase 1: background-position is shifting (~1 s of visible change)
  try {
    await wait(1500);
  } catch (_) {}

  // Dwell phase 2: a bit further into the 15-s cycle for a different hue
  try {
    await wait(1500);
  } catch (_) {}
}
