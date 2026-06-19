// shader-lens-blur: WebGL fragment shader (THREE.js). The u_mouse uniform
// drives a lens-blur / shape distortion that follows the cursor. Move mouse
// across the canvas to show the effect tracking position.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Wait for THREE.js renderer to initialise and first RAF tick.
  try {
    await wait(800);
  } catch (_) {}

  // Enter from the top-left so the lens shape appears there first.
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.25), { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Sweep diagonally to bottom-right (first leg).
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.75), { steps: 60 });
    await wait(400);
  } catch (_) {}

  // Sweep back to top-right (second leg — S-curve).
  try {
    await page.mouse.move(Math.round(W * 0.78), Math.round(H * 0.22), { steps: 55 });
    await wait(300);
  } catch (_) {}

  // Sweep to bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.22), Math.round(H * 0.78), { steps: 55 });
    await wait(300);
  } catch (_) {}

  // Settle at center — lens centered.
  try {
    await page.mouse.move(cx, cy, { steps: 30 });
    await wait(1000);
  } catch (_) {}

  // Slow drift toward the right — gentle loop close.
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.45), { steps: 30 });
    await wait(500);
  } catch (_) {}
}
