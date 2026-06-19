// horizontal-scroll: vertical wheel events drive a sticky horizontal panel
// translation via motion/scroll. 5 full-screen panels (PASSION … BELIVE).
// A 80 vh header precedes the sticky section. Wheel down to slide panels,
// then scroll back to top.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let Lenis and motion/scroll initialise; images start loading.
  try { await wait(800); } catch (_) {}

  // Park mouse in the center so Lenis picks up wheel events.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // The sticky section spans 500 vh (5 panels × 100 vh each).
  // Wheel down in 8 increments to sweep through all 5 panels.
  const steps = 8;
  const delta = Math.round(H * 0.75);
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, delta);
    } catch (_) {}
    try { await wait(350); } catch (_) {}
  }

  // Pause at the end to show the last panel and footer.
  try { await wait(600); } catch (_) {}

  // Scroll back to top so the GIF loop starts cleanly from the header.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  try { await wait(900); } catch (_) {}
}
