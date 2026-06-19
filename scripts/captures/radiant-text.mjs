/**
 * Capture choreography for radiant-text.
 *
 * Behaviour: a CSS `radiant` keyframe animates a semi-transparent shine band
 * left→right across gradient-clipped text on a continuous loop. The demo shows
 * three instances at different durations (6 s, 8 s, 12 s). Auto-plays — no
 * interaction needed beyond a clear dwell that captures at least one full sweep
 * on the fastest instance (6 s cycle).
 * Strategy: park mouse away from text, let the component mount, dwell ~3 s
 * (≥ half a 6 s cycle — enough to show the sweep in motion), return mouse to
 * start for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Park cursor above the text block — well clear of all three lines.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 4 });
  } catch (_) {}

  // Wait for the style tag + p elements to mount and the animation to start.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell ~3 s — captures the radiant shine sweeping through the fastest (6 s)
  // instance roughly halfway across, and the medium (8 s) instance beginning
  // its sweep.
  try {
    await wait(3000);
  } catch (_) {}

  // Return to park position for a tidy loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 3 });
    await wait(150);
  } catch (_) {}
}
