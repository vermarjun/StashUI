/**
 * Choreography: hyper-text (inspira-hyper-text)
 * Behavior: On load (animateOnLoad), letters scramble through random uppercase
 *           chars then resolve left-to-right over ~1200 ms. Hovering the
 *           component retriggers the effect. Demo shows "HyperText Animation".
 * Strategy: park mouse away while mount animation plays, dwell ~1.5 s to show
 *           the scramble resolving, brief pause at resolved state, then hover to
 *           retrigger a second scramble cycle, ending near the start position.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse away so mount animation plays unobstructed
  try {
    await page.mouse.move(W * 0.1, H * 0.9, { steps: 6 });
  } catch (_) {}

  // Wait for mount scramble to resolve (~1200 ms + buffer)
  try {
    await wait(1600);
  } catch (_) {}

  // Brief pause at the resolved state
  try {
    await wait(500);
  } catch (_) {}

  // Move onto the component center to retrigger the scramble→resolve animation
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 14 });
  } catch (_) {}

  // Dwell ~2.5 s to capture the full retrigger cycle
  try {
    await wait(2500);
  } catch (_) {}

  // Return to start position for a clean loop seam
  try {
    await page.mouse.move(W * 0.1, H * 0.9, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
