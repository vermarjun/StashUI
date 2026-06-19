// hero-parallax: SCROLL-DRIVEN parallax flagship hero.
// The component is h-[300vh] — rows of product cards drift in opposite
// directions as the user scrolls. We do a slow wheel-scroll through the
// 3D entry animation and the first two rows, then smooth-scroll back to top.

export default async function capture(page, { W, H, cfg, wait }) {
  // Give framer-motion spring animations time to stabilise on mount
  await wait(600);

  // Scroll down slowly so the perspective entry animation (rotateX/rotateZ)
  // plays out and the product rows become visible and start drifting.
  const scrollAmount = Math.round(H * 0.7);

  try {
    await page.mouse.wheel(0, scrollAmount);
  } catch (_) {}
  await wait(450);

  try {
    await page.mouse.wheel(0, scrollAmount);
  } catch (_) {}
  await wait(450);

  try {
    await page.mouse.wheel(0, scrollAmount);
  } catch (_) {}
  await wait(500);

  // Dwell at mid-scroll so the drifting rows are fully visible
  await wait(600);

  // Smooth-scroll back to top so the loop seam is clean
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  } catch (_) {}
  await wait(800);
}
