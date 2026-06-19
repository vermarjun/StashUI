// components-community-radial-intro: spring-animated radial intro with orbit
// items that fan out from center on mount. Plays automatically. Dwell for the
// full spring sequence, then optionally click to see if remount/reset exists.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Let the spring sequence start (delay:0, stiffness:300, damping:35).
  try {
    await wait(300);
  } catch (_) {}

  // Park cursor at center — doesn't affect the animation.
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}

  // Dwell while orbit items fan out and settle.
  try {
    await wait(2500);
  } catch (_) {}

  // Slow orbit around center — adds life while settled.
  try {
    await page.mouse.move(Math.round(W * 0.62), Math.round(H * 0.38), { steps: 30 });
    await wait(400);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.62), Math.round(H * 0.62), { steps: 25 });
    await wait(400);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.62), { steps: 25 });
    await wait(400);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.38), { steps: 25 });
    await wait(400);
  } catch (_) {}

  // Return to center — loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(500);
  } catch (_) {}
}
