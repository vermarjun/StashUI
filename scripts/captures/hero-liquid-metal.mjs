// hero-liquid-metal: SINGLE-SCREEN hero with a WebGL LiquidMetal shader on
// the right (chromatic aberration, distortion, image mask). The shader is
// complex — allow ~2.5s for GPU init before interacting. Then slow drift.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: WebGL LiquidMetal needs time for texture load + ramp-up
  await wait(2600);

  const cx = W / 2;
  const cy = H / 2;

  // Start at heading area in left column
  try {
    await page.mouse.move(cx * 0.3, cy * 0.75, { steps: 15 });
  } catch (_) {}
  await wait(400);

  // Slow drift across heading
  try {
    await page.mouse.move(cx * 0.7, cy * 0.85, { steps: 45 });
  } catch (_) {}
  await wait(350);

  // Drift to CTA
  try {
    await page.mouse.move(cx * 0.32, cy * 1.08, { steps: 25 });
  } catch (_) {}
  await wait(600);

  // Move toward the liquid metal shader on the right — let the orb fill
  try {
    await page.mouse.move(cx * 1.5, cy * 0.95, { steps: 50 });
  } catch (_) {}
  await wait(700);

  // Return to left to close the loop cleanly
  try {
    await page.mouse.move(cx * 0.45, cy * 0.9, { steps: 35 });
  } catch (_) {}
  await wait(400);
}
