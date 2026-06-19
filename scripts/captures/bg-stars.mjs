/**
 * Choreography: bg-stars
 * Behavior: CSS box-shadow star layers animated with Framer Motion continuous
 *           y-scroll (speed=50 s per 2000 px). Three parallax layers (1 px,
 *           2 px, 3 px dots). The component also reacts to mousemove via
 *           spring-interpolated x/y offsets (factor=0.05).
 *           Strategy: short settle (~0.5 s), dwell ~2.5 s to see the scroll
 *           motion, then a gentle mouse drift to show the parallax spring.
 */
export default async function capture(page, { W, H, wait }) {
  // Stars are pure CSS/Framer Motion — no WebGL, no async load needed.
  // Short settle for the springs to reach equilibrium.
  try { await wait(600); } catch (_) {}

  // Park cursor at centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Dwell: CSS scroll animation moves layers — capture the parallax scroll.
  try { await wait(2500); } catch (_) {}

  // Gentle mouse drift to trigger the spring-based parallax offset.
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.4), { steps: 25 });
    await wait(600);
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.6), { steps: 35 });
    await wait(600);
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 25 });
  } catch (_) {}

  try { await wait(500); } catch (_) {}
}
