// sticky-hero-scroll — SCROLL-DRIVEN (identical structure to sticky-hero-section)
// h-[200vh] container; Section1 is sticky (scale 1→0.8, rotate 0→-5deg);
// Section2 rises with scale 0.8→1, rotate 5→0. A footer brand strip follows.
// Strategy: slow wheel scroll down to show the scale+rotate transition clearly,
// pause mid-reveal, then smooth-scroll back to the top.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for framer-motion and scroll listener to initialise
  await wait(700);

  // First push — Section1 starts shrinking, Section2 peeks up
  try {
    await page.mouse.wheel(0, Math.round(H * 0.35));
  } catch (_) {}
  await wait(500);

  // Continue — Section1 clearly scaled and rotated
  try {
    await page.mouse.wheel(0, Math.round(H * 0.35));
  } catch (_) {}
  await wait(550);

  // Enter Section2 — image grid becomes prominent
  try {
    await page.mouse.wheel(0, Math.round(H * 0.4));
  } catch (_) {}
  await wait(550);

  // Reach near-bottom to show the footer brand text
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
