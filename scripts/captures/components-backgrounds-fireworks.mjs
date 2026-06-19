/**
 * Capture choreography for: components-backgrounds-fireworks
 * Behaviour: canvas-based fireworks — auto-launches on an interval
 * (proportional to population=1) AND launches a firework at the click
 * coordinates. Strategy: let the auto-launcher fire once (~1 s), then click
 * several spread positions so multiple burst patterns overlap and the canvas
 * fills with colour.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for canvas to mount
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  // Short settle so the auto-launch interval fires at least once
  try {
    await wait(800);
  } catch (_) {}

  // Click 1 — lower-left quadrant
  try {
    await page.mouse.click(Math.round(W * 0.25), Math.round(H * 0.6));
    await wait(300);
  } catch (_) {}

  // Click 2 — upper-right quadrant
  try {
    await page.mouse.click(Math.round(W * 0.72), Math.round(H * 0.3));
    await wait(300);
  } catch (_) {}

  // Click 3 — centre
  try {
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.45));
    await wait(300);
  } catch (_) {}

  // Click 4 — upper-left for symmetry
  try {
    await page.mouse.click(Math.round(W * 0.28), Math.round(H * 0.25));
    await wait(300);
  } catch (_) {}

  // Click 5 — lower-right for variety
  try {
    await page.mouse.click(Math.round(W * 0.7), Math.round(H * 0.65));
    await wait(300);
  } catch (_) {}

  // Dwell: let all bursts expand, particles decelerate and fade
  try {
    await wait(1500);
  } catch (_) {}

  // One final auto-launch window before capture
  try {
    await wait(500);
  } catch (_) {}
}
