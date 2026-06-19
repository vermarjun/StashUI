/**
 * Capture choreography for: background-beams-with-collision
 * Behaviour: 7 vertical beams of varying durations (3–11 s) animate from
 * top to bottom and trigger an Explosion particle burst when they hit the
 * bottom strip. Fastest beam (duration 3 s, delay 4 s) arrives first.
 * Strategy: settle ~2 s so early beams are in-flight, dwell ~5 s to catch
 * at least two collision explosions, then park and wait for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in the top-left to avoid obscuring beam impact zone
  try {
    await page.mouse.move(W * 0.05, H * 0.1, { steps: 5 });
  } catch (_) {}

  // Settle: motion/react fade-in + initial beam start
  try {
    await wait(2000);
  } catch (_) {}

  // Dwell: watch beams travel and collide — expect 1–2 explosions here
  try {
    await wait(3500);
  } catch (_) {}

  // Secondary dwell: slower beams and repeat collisions
  try {
    await wait(2000);
  } catch (_) {}

  // Return near start for clean loop seam
  try {
    await page.mouse.move(W * 0.05, H * 0.1, { steps: 5 });
    await wait(400);
  } catch (_) {}
}
