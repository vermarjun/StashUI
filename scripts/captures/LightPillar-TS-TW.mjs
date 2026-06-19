/**
 * Capture choreography for LightPillar-TS-TW
 *
 * LightPillar renders a WebGL vertical light pillar (default: purple→pink
 * gradient, mixBlendMode="screen") that rotates slowly (rotationSpeed=0.3).
 * interactive defaults to false in the demo so there is no mouse tracking.
 * The pillar auto-rotates with noise distortion at quality="high".
 *
 * Strategy:
 *   1. Settle ~2.5 s — quality="high" means heavier shader + noise pass.
 *   2. Dwell ~3 s to show the pillar rotation and colour gradient shift.
 *   3. Cursor at centre — neutral for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // WebGL high-quality shader + noise settle
  try {
    await wait(2500);
  } catch (_) {}

  // Dwell — show the pillar rotating and the gradient pulsing
  try {
    await wait(3000);
  } catch (_) {}

  // Neutral cursor at centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 1 });
    await wait(300);
  } catch (_) {}
}
