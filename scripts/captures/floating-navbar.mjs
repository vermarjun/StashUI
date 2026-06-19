/**
 * Choreography: floating-navbar
 * The FloatingNav only appears when scrollYProgress > 0.05 AND scrolling UP.
 * Strategy: scroll down into the page to build progress, then scroll back up
 * to trigger the navbar reveal, then hover a nav item.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Give React/motion time to mount
  await wait(600);

  // The demo container is 400px tall with overflow:hidden — scroll the whole
  // page viewport down then back up to trigger the motion value listeners.
  try {
    await page.mouse.wheel(0, 300);
    await wait(400);
    await page.mouse.wheel(0, -200);
    await wait(600);
  } catch (_) {}

  // Hover over the center-top area where FloatingNav renders (fixed, top-10)
  try {
    const navY = Math.round(H * 0.08); // ~top-10 ≈ 40px, relative to viewport
    const navX = Math.round(W / 2);
    await page.mouse.move(navX, navY, { steps: 20 });
    await wait(500);
  } catch (_) {}

  // Hover the first nav item ("Home") — it sits ~120px left of center
  try {
    await page.mouse.move(Math.round(W / 2) - 120, Math.round(H * 0.08), { steps: 12 });
    await wait(700);
  } catch (_) {}

  // Hover "About" — slightly right of center
  try {
    await page.mouse.move(Math.round(W / 2) - 30, Math.round(H * 0.08), { steps: 12 });
    await wait(600);
  } catch (_) {}

  // Return near start position
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H * 0.08), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
