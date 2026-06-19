export default async function capture(page, { W, H, cfg, wait }) {
  // Scroll-driven vertical timeline: "Our Journey" with 3 milestone entries.
  // Scrolling down fills the purple/blue gradient progress line.
  await wait(600);

  // Step down through the three milestone entries
  try {
    await page.mouse.wheel(0, H * 0.65);
  } catch (_) {}
  await wait(480);

  try {
    await page.mouse.wheel(0, H * 0.65);
  } catch (_) {}
  await wait(480);

  try {
    await page.mouse.wheel(0, H * 0.65);
  } catch (_) {}
  await wait(480);

  try {
    await page.mouse.wheel(0, H * 0.5);
  } catch (_) {}
  await wait(550);

  // Hold at the bottom — progress line fully drawn
  await wait(700);

  // Smooth return to top for loop
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  } catch (_) {}
  await wait(700);
}
