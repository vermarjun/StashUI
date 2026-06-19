// inspira-smooth-cursor: spring-physics SVG arrow cursor that rotates to face
// the direction of travel and lags behind the pointer. Move in a figure-8 at
// moderate speed so the spring lag and rotation direction changes are visible.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Enter from off-centre so cursor visibly slides into frame.
  try {
    await page.mouse.move(Math.round(W * 0.22), Math.round(H * 0.32), { steps: 6 });
    await wait(300);
  } catch (_) {}

  // --- Figure-8, first lobe (upper) ---
  // Left → top-right
  try {
    await page.mouse.move(Math.round(W * 0.78), Math.round(H * 0.26), { steps: 32 });
    await wait(120);
  } catch (_) {}

  // Top-right → cross-centre going down
  try {
    await page.mouse.move(cx, Math.round(H * 0.55), { steps: 28 });
    await wait(120);
  } catch (_) {}

  // --- Figure-8, second lobe (lower) ---
  // Centre → bottom-left
  try {
    await page.mouse.move(Math.round(W * 0.22), Math.round(H * 0.72), { steps: 28 });
    await wait(120);
  } catch (_) {}

  // Bottom-left → bottom-right
  try {
    await page.mouse.move(Math.round(W * 0.78), Math.round(H * 0.68), { steps: 28 });
    await wait(120);
  } catch (_) {}

  // Bottom-right → cross-centre going up (completes the 8)
  try {
    await page.mouse.move(cx, Math.round(H * 0.44), { steps: 28 });
    await wait(120);
  } catch (_) {}

  // Return toward start — let spring settle.
  try {
    await page.mouse.move(Math.round(W * 0.22), Math.round(H * 0.32), { steps: 30 });
    await wait(600);
  } catch (_) {}
}
