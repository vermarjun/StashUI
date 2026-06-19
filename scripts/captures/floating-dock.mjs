/**
 * Choreography: floating-dock (aceternity-ui)
 * FloatingDockDesktop renders a horizontal bar of 5 icons (40px each + 16px gaps)
 * that magnify when mouse approaches. Strategy: sweep mouse slowly left→right
 * across the dock, pausing at each icon to let the spring settle.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(600);

  // The dock is centered vertically and horizontally.
  // Approximate dock center: W/2, H/2.
  // 5 icons at 40px each + 4 gaps at 16px = 264px total → icons at -132, -66, 0, +66, +132 from center
  const dockCenterX = Math.round(W / 2);
  const dockY = Math.round(H / 2);
  const iconPositions = [-132, -66, 0, 66, 132].map((offset) => dockCenterX + offset);

  // Approach from left, well outside the dock
  try {
    await page.mouse.move(dockCenterX - 250, dockY, { steps: 15 });
    await wait(200);
  } catch (_) {}

  // Slowly sweep across each icon
  for (const x of iconPositions) {
    try {
      await page.mouse.move(x, dockY, { steps: 18 });
      await wait(450); // let spring magnification peak
    } catch (_) {}
  }

  // Continue to the right and off the dock
  try {
    await page.mouse.move(dockCenterX + 250, dockY, { steps: 15 });
    await wait(300);
  } catch (_) {}

  // Sweep back to center to end gracefully
  try {
    await page.mouse.move(dockCenterX, dockY - 80, { steps: 20 });
    await wait(400);
  } catch (_) {}
}
