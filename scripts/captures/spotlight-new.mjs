/**
 * Capture choreography for: spotlight-new
 * Behaviour: dual Framer Motion spotlights oscillate left↔right (xOffset 100)
 * over 7 s each, starting from opposite sides. The effect is pointer-agnostic
 * (pure motion animation), but moving the mouse adds visual interest and
 * confirms the background is live.
 * Strategy: settle ~1.5 s for opacity fade-in, then sweep mouse slowly across
 * the canvas to visually interact with the light beams, dwell at centre, sweep
 * back, and return near start.
 */
export default async function capture(page, { W, H, wait }) {
  // Start mouse at centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 5 });
  } catch (_) {}

  // Settle: motion opacity transition (1.5 s)
  try {
    await wait(1500);
  } catch (_) {}

  // Sweep mouse left — spotlight left beam is near this side
  try {
    await page.mouse.move(W * 0.15, H * 0.45, { steps: 25 });
    await wait(800);
  } catch (_) {}

  // Sweep to centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Sweep mouse right — spotlight right beam oscillates here
  try {
    await page.mouse.move(W * 0.85, H * 0.45, { steps: 25 });
    await wait(800);
  } catch (_) {}

  // Slow arc back through centre to upper area
  try {
    await page.mouse.move(W * 0.5, H * 0.3, { steps: 20 });
    await wait(700);
  } catch (_) {}

  // Dwell near centre to show both beams in oscillation
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await wait(1500);
  } catch (_) {}

  // Return to start for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 5 });
    await wait(300);
  } catch (_) {}
}
