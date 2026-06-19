/**
 * Choreography: primitives-texts-morphing
 * Behavior: MorphingText uses AnimatePresence layoutId to morph individual
 * chars between phrases every holdDelay ms (2000ms / 2200ms in the demo).
 * The spring transition (stiffness=125, damping=25, mass=0.4) settles in
 * ~0.5–0.8s per char transition. Both instances have inView=true and
 * loop=true. Dwell ~3.5s to capture the first morph mid-flight on both lines.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in neutral corner — no hover interaction on this component.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
  } catch (_) {}

  // Brief settle — both MorphingText instances render their first phrase immediately.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell past the 2000ms holdDelay so the first morph transition fires and
  // is mid-animation (~0.5s into the char spring transitions).
  try {
    await wait(3500);
  } catch (_) {}

  // Hold on the new phrase after the spring settles.
  try {
    await wait(400);
  } catch (_) {}

  // Return near start for loop cut.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
