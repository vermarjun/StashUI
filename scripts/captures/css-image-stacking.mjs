export default async function capture(page, { W, H, cfg, wait }) {
  // Let Lenis init and Unsplash images load
  await wait(800);

  // 6 images, each in a full-screen (h-screen) sticky div with increasing top
  // offsets (top-0 → top-12). Scroll stacks them like a deck: each new image
  // slides up and covers the previous at a slightly wider width.
  // Page is ~8 screens tall total (hero + 6 cards + footer).
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.7));
    } catch (_) {}
    await wait(450);
  }

  // Pause at the bottom — all 6 images stacked, widest card on top
  await wait(500);

  // Smooth-scroll back to top so loop resets cleanly
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(800);
}
