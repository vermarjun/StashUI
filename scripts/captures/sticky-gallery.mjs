export default async function capture(page, { W, H, cfg, wait }) {
  // Let Lenis init and Unsplash images load
  await wait(800);

  // Page has a hero screen + a 12-col image section where left/right columns
  // scroll while the center column stays sticky (CSS sticky top-0, h-screen).
  // Scroll down in 6 steps to reveal the side columns flowing past the fixed center.
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.7));
    } catch (_) {}
    await wait(450);
  }

  // Dwell at the bottom — side columns fully past, center still pinned
  await wait(500);

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(800);
}
