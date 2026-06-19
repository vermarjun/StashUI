/**
 * Choreography: primitives-texts-counting-number
 * Behavior: spring-animated counter counts from 0 to target on mount (inView=true).
 * Default spring: stiffness=90, damping=50. Three counters: 1234, 98.6, 5000.
 * The 5000-counter (largest range) takes ~2.5–3s to settle with this spring.
 * Dwell ~3.5s to let all three finish counting, then hold on the final values.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from numbers — no hover effects, just avoids any layout shifts.
  try {
    await page.mouse.move(Math.round(W - 30), Math.round(H - 30), { steps: 4 });
  } catch (_) {}

  // Settle — counters start immediately on mount.
  try {
    await wait(300);
  } catch (_) {}

  // Dwell while all spring counters animate to their targets.
  try {
    await wait(3200);
  } catch (_) {}

  // Brief hold on the final settled values.
  try {
    await wait(600);
  } catch (_) {}

  // Move cursor back near start for loop cut.
  try {
    await page.mouse.move(Math.round(W - 30), Math.round(H - 30), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
