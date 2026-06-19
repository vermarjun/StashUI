export default async function capture(page, { W, H, cfg, wait }) {
  // Let scroll-driven animations initialise
  await wait(700);

  // Slowly scroll down through the full timeline (4 entries with images)
  // triggering the gradient progress line animation
  try {
    await page.mouse.wheel(0, H * 0.6);
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.wheel(0, H * 0.6);
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.wheel(0, H * 0.6);
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.wheel(0, H * 0.65);
  } catch (_) {}
  await wait(500);

  try {
    await page.mouse.wheel(0, H * 0.65);
  } catch (_) {}
  await wait(600);

  // Pause at bottom so the purple/blue progress line is fully visible
  await wait(600);

  // Smooth-scroll back to top for a clean loop
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  } catch (_) {}
  await wait(800);
}
