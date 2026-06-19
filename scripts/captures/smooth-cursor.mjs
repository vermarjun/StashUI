// smooth-cursor: replaces the system cursor with a spring-driven SVG arrow
// that rotates to face the direction of travel and eases to rest.
// Move in slow arcs and a figure-8 so the spring lag and rotation are visible.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Start off-centre so the cursor visibly moves into frame.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.3), { steps: 5 });
  } catch (_) {}

  // Settle: let the component mount and pointermove listener attach.
  try { await wait(300); } catch (_) {}

  // Figure-8 arc — slow enough for spring lag to show.
  // Top-left → top-right
  try {
    await page.mouse.move(Math.round(W * 0.75), Math.round(H * 0.28), { steps: 30 });
    await wait(120);
  } catch (_) {}

  // Top-right → bottom-center
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.62), { steps: 28 });
    await wait(120);
  } catch (_) {}

  // Bottom-center → bottom-left
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.7), { steps: 25 });
    await wait(120);
  } catch (_) {}

  // Bottom-left → center (crossing axis)
  try {
    await page.mouse.move(cx, cy, { steps: 28 });
    await wait(200);
  } catch (_) {}

  // Center → top-right (second lobe of figure-8)
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.32), { steps: 28 });
    await wait(120);
  } catch (_) {}

  // Back toward start position — let spring settle.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.3), { steps: 30 });
    await wait(500);
  } catch (_) {}
}
