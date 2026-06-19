// hero-ai-infrastructure — SINGLE-SCREEN with WebGL ShaderGradient (dark blue sphere)
// TimelineAnimation stagger reveals (animationNum 1-11) on mount.
// Logo strip at the bottom has its own whileInView — a small scroll reveals it.
// Strategy: wait for WebGL settle + stagger-in → hover primary CTA →
// tiny scroll to reveal logo strip → hover secondary CTA → back to top.

export default async function capture(page, { W, H, cfg, wait }) {
  // Allow ShaderGradientCanvas to render and all stagger-in items to appear
  await wait(2000);

  const cx = W / 2;

  // Hover "Book a Free Demo" primary CTA (centred, roughly 62% y)
  try {
    await page.mouse.move(Math.round(W * 0.43), Math.round(H * 0.62), { steps: 25 });
  } catch (_) {}
  await wait(700);

  // Hover "Build With AI" secondary CTA
  try {
    await page.mouse.move(Math.round(W * 0.57), Math.round(H * 0.62), { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Tiny scroll to bring the "Trusted by" logos into view
  try {
    await page.mouse.wheel(0, Math.round(H * 0.22));
  } catch (_) {}
  await wait(700);

  // Hover the Google logo area
  try {
    await page.mouse.move(Math.round(W * 0.28), Math.round(H * 0.82), { steps: 20 });
  } catch (_) {}
  await wait(500);

  // Scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(900);
}
