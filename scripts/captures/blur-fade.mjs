// blur-fade: content fades+unblurs in on mount (inView=false = immediate).
// Dwell so the entrance animation plays fully, then a tiny scroll to retrigger
// any inView-gated items and return to top for a clean loop.
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse off-center; blur-fade is motion-triggered, not cursor-driven.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.8), { steps: 6 });
  } catch (_) {}

  // Initial settle — let mount animation finish (duration 0.4 s + delay 0.04 s).
  try { await wait(600); } catch (_) {}

  // Dwell on fully-revealed content.
  try { await wait(1800); } catch (_) {}

  // Scroll down a little to expose any inView items below the fold.
  try {
    await page.mouse.wheel(0, Math.round(H * 0.3));
    await wait(700);
  } catch (_) {}

  // Scroll back to top so loop seam is clean.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(600);
  } catch (_) {}
}
