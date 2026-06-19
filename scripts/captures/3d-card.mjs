/**
 * Capture choreography for 3d-card (CardContainer / CardBody / CardItem).
 *
 * Effect: mouse position over the card drives rotateX/rotateY on the
 * container via inline style; CardItem children translate in Z when
 * isMouseEntered becomes true.
 * Strategy: enter the card from the top-left → sweep slowly to top-right
 * (tilt along Y axis) → sweep down to bottom-right (tilt along X) →
 * sweep to bottom-left → return to centre (maximum depth pop) → leave.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // The 3D container has perspective:1000px — locate by its perspective style
  // or fall back to the CardBody which has h-96 w-96
  let box;
  try {
    const container = page
      .locator("[style*='perspective']")
      .first();
    await container.waitFor({ state: "visible", timeout: 8000 });
    box = await container.boundingBox();
  } catch {
    box = { x: W * 0.2, y: H * 0.1, width: W * 0.6, height: H * 0.8 };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  // Waypoints for the orbital sweep (clock-wise starting top-left)
  const waypoints = [
    { tx: x + width * 0.1,  ty: y + height * 0.1  }, // top-left
    { tx: x + width * 0.9,  ty: y + height * 0.1  }, // top-right
    { tx: x + width * 0.9,  ty: y + height * 0.9  }, // bottom-right
    { tx: x + width * 0.1,  ty: y + height * 0.9  }, // bottom-left
    { tx: cx,               ty: cy                 }, // centre (deepest pop)
  ];

  await wait(500);

  // Enter at top-left
  try {
    await page.mouse.move(waypoints[0].tx, waypoints[0].ty);
    await wait(200);
  } catch { /* continue */ }

  // Sweep through waypoints
  for (let wi = 1; wi < waypoints.length; wi++) {
    const from = waypoints[wi - 1];
    const to = waypoints[wi];
    const steps = 28;
    try {
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        await page.mouse.move(
          from.tx + (to.tx - from.tx) * t,
          from.ty + (to.ty - from.ty) * t
        );
        await wait(22);
      }
      // Brief dwell at each corner
      await wait(wi === waypoints.length - 1 ? 600 : 200);
    } catch { /* continue */ }
  }

  // Leave card — transform resets to 0deg 0deg
  try {
    await page.mouse.move(x - 80, cy);
    await wait(500);
  } catch { /* continue */ }
}
