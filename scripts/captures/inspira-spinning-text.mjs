/**
 * Capture choreography for inspira-spinning-text (source: spinning-text.tsx).
 *
 * Behaviour: characters of the text are distributed on a circular path and the
 * whole ring rotates continuously via a Framer Motion infinite rotate animation
 * (duration=8 s). Auto-plays immediately on mount.
 * Strategy: park cursor above the ring so no stray hover state interferes, let
 * the animation start, then dwell ~3 s (~37 % of one full rotation — clearly
 * visible motion without needing a complete cycle).
 */
export default async function capture(page, { W, H, wait }) {
  // Park cursor well above the spinning ring (centred in the demo).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 4 });
  } catch (_) {}

  // Wait for component mount and Framer Motion to begin animating.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell ~3 s — ~37 % of an 8 s rotation, enough to show clear angular
  // movement of the character ring.
  try {
    await wait(3000);
  } catch (_) {}

  // Tiny nudge to stay in the same off-centre zone for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 3 });
    await wait(150);
  } catch (_) {}
}
