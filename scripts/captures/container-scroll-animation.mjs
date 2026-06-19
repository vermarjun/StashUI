export default async function capture(page, { W, H, cfg, wait }) {
  // Allow 3D perspective and initial state to render
  await wait(600);

  // The card starts rotated 20° on X-axis (tilted back) and flattens to 0°
  // as scrollYProgress goes 0→1.  Scroll in four smooth chunks so the
  // transition from tilted-3D → flat card is clearly animated.
  const chunks = 4;
  for (let i = 0; i < chunks; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.7));
    } catch (_) {}
    await wait(500);
  }

  // Pause with the card fully flat (rotation=0, scale=1)
  await wait(600);

  // Scroll back to top so the tilt is visible at loop start
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(900);
}
