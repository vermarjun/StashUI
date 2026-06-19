/**
 * Choreography: inspira-aurora-background
 * Behavior: CSS-animated aurora gradient (repeating-linear-gradient) using
 *           the `animate-aurora` keyframe. Purely automatic — no pointer
 *           interaction. Strategy: settle ~1 s for the animation to ramp,
 *           then dwell ~4 s to capture a smooth sweep of the aurora colors.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the aurora CSS animation initialise and reach a visually interesting
  // mid-cycle position (keyframe runs at CSS-defined speed, typically ~60 s).
  try { await wait(1200); } catch (_) {}

  // Park cursor near the centre so it does not interfere with any hover states.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 12 });
  } catch (_) {}

  // Dwell — let the animation play through a visible colour shift segment.
  try { await wait(4000); } catch (_) {}

  // Gentle drift up-right to show the radial-gradient mask corner fade.
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.35), { steps: 20 });
    await wait(1000);
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 20 });
  } catch (_) {}

  try { await wait(500); } catch (_) {}
}
