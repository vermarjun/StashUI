/**
 * Capture choreography for inspira-sparkles-text (source: sparkles-text.tsx).
 *
 * Behaviour: star SVGs animate around the text continuously via a setInterval
 * that regenerates sparkle positions every 100 ms. Each sparkle has a lifespan
 * of 5–15 ticks, so the field refreshes visually every ~0.5–1.5 s. Auto-plays
 * — no user interaction needed.
 * Strategy: park mouse away from the text so no browser hover state interferes,
 * allow the component to mount and the interval to tick a few times, then dwell
 * ~3 s to show multiple full sparkle lifecycle waves.
 */
export default async function capture(page, { W, H, wait }) {
  // Park cursor in the top-left corner, away from the centred text.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.08), { steps: 4 });
  } catch (_) {}

  // Allow component mount + first interval ticks (~3 cycles at 100 ms each).
  try {
    await wait(500);
  } catch (_) {}

  // Dwell ~3 s — spans ~3 full average sparkle lifespan windows (each ~1 s).
  try {
    await wait(3000);
  } catch (_) {}

  // Return mouse to park position for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.08), { steps: 3 });
    await wait(150);
  } catch (_) {}
}
