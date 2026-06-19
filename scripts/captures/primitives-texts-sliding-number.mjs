/**
 * Choreography: primitives-texts-sliding-number
 * Behavior: the demo cycles through several target values every 1800ms via
 * setInterval, causing each digit roller to spring-animate to its new position.
 * The spring is stiffness=200, damping=20, mass=0.4 — fast and bouncy (~0.8s
 * per digit change). Dwell ~3s to capture 1–2 full number transitions.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from digits — no hover effects.
  try {
    await page.mouse.move(Math.round(W - 30), Math.round(H - 30), { steps: 4 });
  } catch (_) {}

  // Settle: component mounts and fires the first interval tick immediately.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell — two full 1800ms cycles gives a clear picture of the sliding digits.
  try {
    await wait(3200);
  } catch (_) {}

  // Hold on the settled value after the spring completes.
  try {
    await wait(400);
  } catch (_) {}

  // Return near start for loop cut.
  try {
    await page.mouse.move(Math.round(W - 30), Math.round(H - 30), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
