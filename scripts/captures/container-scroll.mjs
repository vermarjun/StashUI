/**
 * Choreography: container-scroll
 * Behavior: The component is 60 rem (≈960 px) tall on desktop. The card starts
 *           rotated 20 ° on the X-axis (foreshortened) and flattens to 0 ° as
 *           the user scrolls. scroll:true is set in the sidecar. Wheel down
 *           gradually, dwell, then wheel back to top.
 */
export default async function choreography(page, { W, H }) {
  // Park cursor in the middle of the viewport.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await page.waitForTimeout(800); // let the initial tilted card render
  } catch (_) {}

  // Scroll down in increments so the rotation transition is visible.
  const steps = 8;
  const deltaPerStep = 180; // px per wheel tick

  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, deltaPerStep);
      await page.waitForTimeout(200);
    } catch (_) {}
  }

  // Dwell at the bottom to show the fully-flat card.
  try {
    await page.waitForTimeout(1200);
  } catch (_) {}

  // Scroll back to top so the capture ends near the starting state.
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, -deltaPerStep);
      await page.waitForTimeout(200);
    } catch (_) {}
  }

  try {
    await page.waitForTimeout(600);
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
}
