/**
 * Capture choreography for LetterGlitch-TS-TW
 *
 * LetterGlitch renders a canvas grid of ASCII characters that glitch and colour-
 * cycle (green/teal palette by default). Animation is purely time-driven via
 * requestAnimationFrame — no pointer interaction. The outer vignette darkens
 * edges, so there is natural framing.
 *
 * Strategy:
 *   1. Short settle ~1.5 s for canvas init and first glitch cycle.
 *   2. Cursor at centre (neutral).
 *   3. Dwell ~3 s — multiple glitch waves propagate across the grid, characters
 *      shift and colour-transition are visible.
 *   4. Stay at centre for clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Canvas init + first glitch frame settle
  try {
    await wait(1500);
  } catch (_) {}

  // Neutral cursor — no pointer interaction in this component
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
  } catch (_) {}

  // Dwell — glitch waves cycle through the character grid
  try {
    await wait(3000);
  } catch (_) {}
}
