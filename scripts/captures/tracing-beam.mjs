export default async function capture(page, { W, H, cfg, wait }) {
  // Let the SVG height measurement settle and spring initialise
  await wait(700);

  // Scroll down steadily — the gradient segment on the SVG beam chases scroll
  // progress, painting cyan → violet → purple as it descends.
  const steps = 5;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.6));
    } catch (_) {}
    await wait(480);
  }

  // Hold at the bottom so the fully-traced beam is visible
  await wait(500);

  // Return to top for a clean loop
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } catch (_) {}
  await wait(800);
}
