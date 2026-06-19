/**
 * Capture choreography for aceternity-ui-spotlight.
 *
 * Shares the same demo as `spotlight` — SVG beam with CSS `animate-spotlight`.
 * Strategy: wait for opacity animation, then move mouse slowly across the beam
 * hotspot (upper-left quadrant), arc to bottom-centre, return near top-left.
 * (Identical choreography to spotlight.mjs — kept as separate file per convention.)
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the CSS spotlight animation (opacity 0 → 1).
  try { await wait(1500); } catch (_) {}

  // Position near the left edge where the beam originates.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.2), { steps: 5 });
    await wait(200);
  } catch (_) {}

  // Slow sweep left → right through the beam hotspot.
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.25), { steps: 40 });
    await wait(800);
  } catch (_) {}

  // Arc down toward centre.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.55), { steps: 25 });
    await wait(600);
  } catch (_) {}

  // Dwell at centre.
  try { await wait(500); } catch (_) {}

  // Return near upper-left — loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.15), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
