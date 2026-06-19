export default async function capture(page, { W, H, cfg, wait }) {
  // MacbookScroll has min-h-[200vh] so there's plenty of scroll room.
  // The lid opens (rotateX -28→0) and the screen scales up between
  // scrollYProgress 0.1→0.3; the body translates off-screen by ~0.3+.
  // We want to capture the lid-open animation clearly.
  await wait(700);

  // First wheel: get past the 0.1 threshold where lid rotation kicks in
  try {
    await page.mouse.wheel(0, Math.round(H * 0.6));
  } catch (_) {}
  await wait(500);

  // Continue slowly through the 0.1→0.3 pin range (lid opens)
  try {
    await page.mouse.wheel(0, Math.round(H * 0.5));
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.wheel(0, Math.round(H * 0.5));
  } catch (_) {}
  await wait(500);

  // A couple more steps to show the fully-open screen scaling up
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55));
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.wheel(0, Math.round(H * 0.55));
  } catch (_) {}
  await wait(600);

  // Pause with the lid fully open and screen scaled
  await wait(600);

  // Return to top so the closed-lid state is visible at loop start
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(900);
}
