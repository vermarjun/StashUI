/**
 * Choreography: primitives-texts-rotating
 * Behavior: RotatingTextContainer cycles through an array of words every
 * duration ms (2000ms / 1800ms in the demo). Each transition is a
 * vertical AnimatePresence slide (opacity + y). Auto-plays immediately.
 * Dwell ~3.5s captures at least one full rotation (2s) plus the entry
 * transition of the next word.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in neutral position — no hover effects on this component.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.2), { steps: 5 });
  } catch (_) {}

  // Brief settle for mount — first word is visible immediately.
  try {
    await wait(400);
  } catch (_) {}

  // Wait through one full rotation (2000ms) and into the next word entry.
  try {
    await wait(3500);
  } catch (_) {}

  // Hold on the second/third word.
  try {
    await wait(400);
  } catch (_) {}

  // Return near start.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.2), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
