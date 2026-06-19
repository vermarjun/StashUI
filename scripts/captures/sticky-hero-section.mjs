// sticky-hero-section — SCROLL-DRIVEN
// Section1 is sticky (scale 1→0.8, rotate 0→-5deg) while Section2 rises up
// from underneath as scrollYProgress goes 0→1 over the 200vh container.
// Strategy: slow wheel down through both sections, pause mid-way to show the
// scale+rotate effect on Section1, then smooth-scroll back to top.

export default async function capture(page, { W, H, cfg, wait }) {
  // Let sticky layout and framer-motion initialise
  await wait(700);

  // First gentle push — Section1 begins to shrink/rotate, Section2 peeks
  try {
    await page.mouse.wheel(0, Math.round(H * 0.35));
  } catch (_) {}
  await wait(500);

  // Continue — Section1 clearly scaled down and tilted
  try {
    await page.mouse.wheel(0, Math.round(H * 0.35));
  } catch (_) {}
  await wait(550);

  // Push into the second half — Section2 grid of images becomes visible
  try {
    await page.mouse.wheel(0, Math.round(H * 0.4));
  } catch (_) {}
  await wait(550);

  // Reach near-bottom so footer brand text comes into view
  try {
    await page.mouse.wheel(0, Math.round(H * 0.45));
  } catch (_) {}
  await wait(600);

  // Dwell at the bottom
  await wait(500);

  // Smooth-scroll back to top for a clean loop seam
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(900);
}
