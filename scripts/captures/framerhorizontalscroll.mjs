export default async function capture(page, { W, H, cfg, wait }) {
  // Let Unsplash images load and the carousel measure its width
  await wait(800);

  // The section is 300vh tall; vertical wheel events translate the image row
  // horizontally (useTransform maps scrollYProgress → x offset).
  // Wheel down through the full 300vh in 6 steps to sweep all 16 images left.
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.7));
    } catch (_) {}
    await wait(450);
  }

  // Pause at the end — footer ("Thanks for Scrolling") is visible
  await wait(500);

  // Smooth-scroll back to top so the carousel resets for the loop
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(800);
}
