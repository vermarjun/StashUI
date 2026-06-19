// neumorph-button: inset shadow shifts on hover (scale up) and click (scale + deeper inset).
// Show hover lift, then click to show press/depth, then release.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell in resting state
  await wait(600);

  // Hover the button — motion spring scales up slightly
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 18 });
  } catch (_) {}

  // Hover dwell — show elevated shadow state
  await wait(1600);

  // Click/press — inset shadow deepens, scale drops slightly
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(400);

  // Release
  try {
    await page.mouse.up();
  } catch (_) {}

  // Brief post-click hover dwell
  await wait(900);

  // Move away to resting state
  try {
    await page.mouse.move(W * 0.1, H * 0.15, { steps: 14 });
  } catch (_) {}

  // Resting dwell — loop seam on idle state
  await wait(700);
}
