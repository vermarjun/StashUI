// smooth-scroll: Lenis smooth-scroll demo with 3 stacked sticky sections.
// Each section is 100 vh; scrolling reveals successive cards stacking on top.
// Wheel down through all sections, then scroll back to top.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for Lenis to attach and layout to settle.
  try { await wait(600); } catch (_) {}

  // Park mouse in the viewport center.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Wheel down through 3 sections (each 100 vh) in 6 increments.
  const steps = 6;
  const delta = Math.round(H * 0.6);
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, delta);
    } catch (_) {}
    try { await wait(400); } catch (_) {}
  }

  // Brief pause at the bottom section ("Thanks to Scroll").
  try { await wait(700); } catch (_) {}

  // Smooth-scroll back to top for a clean loop.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  try { await wait(900); } catch (_) {}
}
