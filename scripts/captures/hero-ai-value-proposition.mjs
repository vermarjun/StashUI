// hero-ai-value-proposition — SINGLE-SCREEN (light bg) with TimelineAnimation
// stagger reveals. A product mockup section sits below the fold and has
// whileInView animations — a small scroll is enough to trigger them.
// Strategy: dwell for stagger-in → tiny scroll to trigger mockup whileInView
// → hover CTA → hover one of the project-type cards → scroll back to top.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for mount stagger-in animations (header + headline + CTA ~7 items)
  await wait(1200);

  // Hover the primary "Get started for free" CTA (centred, roughly 52% y)
  const cx = W / 2;

  try {
    await page.mouse.move(cx, Math.round(H * 0.52), { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Tiny scroll to trigger the mockup whileInView animations below
  try {
    await page.mouse.wheel(0, Math.round(H * 0.25));
  } catch (_) {}
  await wait(700);

  // Hover the "Web app" card in the right panel (appears after scroll)
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.6), { steps: 25 });
  } catch (_) {}
  await wait(600);

  // Hover the "UX/UI Design" card (grayscale → colour on hover)
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.6), { steps: 20 });
  } catch (_) {}
  await wait(500);

  // Scroll back to top so the headline is fully visible on loop restart
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(800);
}
