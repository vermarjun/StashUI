/**
 * Capture choreography for DecayCard-TS-TW
 *
 * DecayCard uses an SVG feTurbulence + feDisplacementMap filter driven by
 * global mousemove. Moving the cursor rapidly increases the displacement
 * scale, visibly distorting the card image. Slowing down lets it relax back.
 * GSAP's render loop runs on rAF so the effect responds immediately.
 *
 * Strategy:
 *   1. Settle 1.5 s so the image loads and the GSAP loop initialises.
 *   2. Sweep left→right across the full viewport at mid-height (fast pass →
 *      maximum distortion).
 *   3. Pause 1 s so the displacement decays visibly.
 *   4. Sweep right→left more slowly (shows the relaxation arc).
 *   5. Diagonal drift — top-left to bottom-right — to hit 2-axis rotation.
 *   6. Return to centre; dwell briefly so the card settles.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the image load and GSAP loop initialise
  try {
    await wait(1500);
  } catch (_) {}

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Fast left→right sweep — builds up displacement
  try {
    await page.mouse.move(Math.round(W * 0.05), cy, { steps: 3 });
    await page.mouse.move(Math.round(W * 0.95), cy, { steps: 18 });
  } catch (_) {}

  // Pause — watch displacement scale decay
  try {
    await wait(1000);
  } catch (_) {}

  // Slower right→left sweep
  try {
    await page.mouse.move(Math.round(W * 0.95), cy, { steps: 3 });
    await page.mouse.move(Math.round(W * 0.05), cy, { steps: 24 });
  } catch (_) {}

  // Pause again
  try {
    await wait(800);
  } catch (_) {}

  // Diagonal — top-left to bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.15), { steps: 4 });
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.85), { steps: 20 });
  } catch (_) {}

  // Return to centre; let card settle
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(700);
  } catch (_) {}
}
