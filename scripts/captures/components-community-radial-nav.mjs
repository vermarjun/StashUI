/**
 * Choreography: components-community-radial-nav
 * RadialNav renders a circle (200px diameter) with 5 MenuButton items placed at
 * 0°, 72°, 144°, 216°, 288° on the orbit. Each click activates an item and
 * rotates the central pointer. Hovering an item expands the pill label.
 * Strategy: click each item in order, dwell on the hover-expanded label.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(600);

  // RadialNav is centered at W/2, H/2. Orbit radius = 200/2 - 0.5 = 99.5px.
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);
  const r = 99; // orbit radius in px

  // Compute button centers for each angle (angle - 90 converts to SVG polar)
  // Matches getPolarCoordinates in the component: rad = (angle - 90) * PI / 180
  function polar(deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: Math.round(cx + r * Math.cos(rad)),
      y: Math.round(cy + r * Math.sin(rad)),
    };
  }

  // Items: id1→0°, id2→72°, id3→144°, id4→216°, id5→288°
  const positions = [0, 72, 144, 216, 288].map(polar);

  // Item 1 is already active (defaultActiveId=1); hover it first to show expanded label
  try {
    await page.mouse.move(positions[0].x, positions[0].y, { steps: 15 });
    await wait(500);
  } catch (_) {}

  // Click item 2 (Search, 72°)
  try {
    await page.mouse.move(positions[1].x, positions[1].y, { steps: 15 });
    await wait(300);
    await page.mouse.click(positions[1].x, positions[1].y);
    await wait(600); // pointer rotation spring settles
  } catch (_) {}

  // Dwell to show expanded "Search" label on hover
  try {
    await page.mouse.move(positions[1].x, positions[1].y, { steps: 5 });
    await wait(500);
  } catch (_) {}

  // Click item 3 (Notifications, 144°)
  try {
    await page.mouse.move(positions[2].x, positions[2].y, { steps: 18 });
    await wait(300);
    await page.mouse.click(positions[2].x, positions[2].y);
    await wait(600);
  } catch (_) {}

  // Click item 4 (Profile, 216°)
  try {
    await page.mouse.move(positions[3].x, positions[3].y, { steps: 18 });
    await wait(300);
    await page.mouse.click(positions[3].x, positions[3].y);
    await wait(600);
  } catch (_) {}

  // Click item 5 (Settings, 288°)
  try {
    await page.mouse.move(positions[4].x, positions[4].y, { steps: 18 });
    await wait(300);
    await page.mouse.click(positions[4].x, positions[4].y);
    await wait(600);
  } catch (_) {}

  // Return to item 1 (Home, 0°) to complete loop
  try {
    await page.mouse.move(positions[0].x, positions[0].y, { steps: 18 });
    await wait(300);
    await page.mouse.click(positions[0].x, positions[0].y);
    await wait(500);
  } catch (_) {}

  // Move to center to end
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(300);
  } catch (_) {}
}
