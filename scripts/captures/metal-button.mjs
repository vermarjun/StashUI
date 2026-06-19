// metal-button: liquid metal shader ring animates continuously around the button.
// Hover to show reflections shift, click to show press, then settle.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let the metal shader establish its reflections
  await wait(1000);

  // Hover the button — metal ring reacts to cursor proximity
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
  } catch (_) {}

  // Hover dwell — reflections and glow visible
  await wait(1800);

  // Click to show pressed/depth state
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(300);
  try {
    await page.mouse.up();
  } catch (_) {}

  // Post-click hover dwell
  await wait(1000);

  // Move away
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 14 });
  } catch (_) {}

  // Resting dwell — metal ring still animating
  await wait(800);
}
